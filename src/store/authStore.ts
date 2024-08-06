import { create } from "zustand";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Sentry from "@sentry/react-native";

interface AuthState {
  phoneNumber: string;
  areaCode: string;
  confirm: any | null;
  user: any | null;
  code: string;
  loading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setAreaCode: (areaCode: string) => void;
  setConfirm: (confirm: any | null) => void;
  setUser: (user: any | null) => void;
  setUserId: (userId: string) => void;
  setCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  registerUser: () => Promise<{ status: string; message?: string }>;
  signInWithPhoneNumber: () => Promise<{ success: boolean }>;
  confirmCode: () => Promise<{ status: string; message?: string }>;
  checkUserToken: () => Promise<boolean>;
  logout: () => Promise<void>;
  checkUserExists: (phoneNumber: string) => Promise<boolean>;
  getUserData: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  areaCode: "+34",
  confirm: null,
  user: null,
  code: "",
  loading: false,
  firstName: "",
  lastName: "",
  userId: "",
  email: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setAreaCode: (areaCode) => set({ areaCode }),
  setConfirm: (confirm) => set({ confirm }),
  setUser: (user) => set({ user }),
  setUserId: (userId) => set({ userId }),
  setCode: (code) => set({ code }),
  setLoading: (loading) => set({ loading }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setName: (name) => {
    const [firstName, lastName] = name.split(" ");
    set({ firstName, lastName });
  },

  registerUser: async () => {
    const { phoneNumber, areaCode, firstName, lastName, email } = get();
    set({ loading: true });
    try {
      const fullPhoneNumber = areaCode + phoneNumber;

      // Obtener el ID del usuario actual autenticado
      const currentUser = auth().currentUser;
      // if (!currentUser) {
      //   throw new Error("User not authenticated");
      // }
      const userId = currentUser?.uid;
      const userDocRef = firestore().collection("users").doc(userId);
      const userData = {
        phoneNumber: fullPhoneNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        displayName: `${firstName} ${lastName}`,
        emailVerified: false,
        isAnonymous: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await userDocRef.set(userData);
      set({ loading: false });
      return { status: "SUCCESS" };
    } catch (error) {
      // Sentry.captureException({
      //   message: "Error al registrar el usuario",
      //   error,
      // });
      console.error("Error al registrar el usuario:", error);
      set({ loading: false });
      return { status: "ERROR", message: error.message };
    }
  },

  signInWithPhoneNumber: async () => {
    const { phoneNumber, areaCode } = get();
    set({ loading: true });

    if (!phoneNumber || !areaCode) {
      console.error("Número de teléfono o código de área no proporcionado.");
      set({ loading: false });
      return {
        success: false,
        message: "Número de teléfono o código de área no proporcionado.",
      };
    }

    const fullPhoneNumber = `${areaCode}${phoneNumber}`; 
    console.log("Intentando enviar código de verificación a:", fullPhoneNumber);

    try {
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      set({ confirm: confirmation, loading: false });
      console.log("Código de verificación enviado exitosamente.");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      console.error("Error al enviar el código de verificación:", error);
      return { success: false, message: error.message };
    }
  },

  confirmCode: async () => {
    const { confirm, code, firstName, lastName, email, phoneNumber, areaCode } =
      get();

    set({ loading: true });
    try {
      const userCredentials = await confirm.confirm(code);
      const user = userCredentials.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", user.uid);
      console.log("Usuario autenticado:", user);

      // Obtener datos adicionales del usuario desde Firestore
      const userDocRef = firestore().collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log("Datos adicionales del usuario desde Firestore:", userData);
        set({
          user: { ...user.toJSON(), ...userData },
          userId: user.uid,
          loading: false,
        });
      } else {
        console.log("No se encontraron datos adicionales en Firestore.");
        const fullPhoneNumber = areaCode + phoneNumber;
        const newUser = {
          phoneNumber: fullPhoneNumber,
          firstName: firstName,
          lastName: lastName,
          email: email,
          displayName: `${firstName} ${lastName}`,
          emailVerified: false,
          isAnonymous: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        await userDocRef.set(newUser);
        set({
          user: {
            ...user.toJSON(),
            ...newUser,
          },
          userId: user.uid,
          loading: false,
        });
      }

      return { status: "SUCCESS" };
    } catch (error) {
      set({ loading: false });
      // Sentry.captureException({
      //   message: "Error al confirmar el código",
      //   error,
      // });
      console.error("Error al confirmar el código:", error);
      return { status: "ERROR", message: error.message };
    }
  },

  checkUserToken: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      return token !== null;
    } catch (error) {
      console.error("Error al verificar el token en AsyncStorage:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      set({ user: null });
    } catch (error) {
      console.error("Error al eliminar el token de AsyncStorage:", error);
    }
  },

  checkUserExists: async (phoneNumber) => {
    set({ loading: true });
    try {
      const usersSnapshot = await firestore()
        .collection("users")
        .where("phoneNumber", "==", phoneNumber)
        .get();
      set({ loading: false });
      return !usersSnapshot.empty;
    } catch (error) {
      console.error("Error al verificar si el usuario existe:", error);

      set({ loading: false });
      return false;
    }
  },

  getUserData: async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userDoc = await firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        set({
          user: { ...currentUser.toJSON(), ...userData },
          userId: currentUser.uid,
        });
      } else {
        set({ user: null });
      }
    } else {
      set({ user: null });
    }
  },
}));

export { useAuthStore };
