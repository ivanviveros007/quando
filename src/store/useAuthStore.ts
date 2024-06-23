import { create } from "zustand";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  setPhoneNumber: (phoneNumber: string) => void;
  setAreaCode: (areaCode: string) => void;
  setConfirm: (confirm: any | null) => void;
  setUser: (user: any | null) => void;
  setCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  registerUser: () => Promise<{ status: string; message?: string }>;
  signInWithPhoneNumber: () => Promise<{ success: boolean; message?: string }>;
  confirmCode: () => Promise<{ status: string; message?: string }>;
  checkUserToken: () => Promise<boolean>;
  logout: () => Promise<void>;
  setName: (name: string) => void;
  checkUserExists: (phoneNumber: string) => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  areaCode: "+54",
  confirm: null,
  user: null,
  code: "",
  loading: false,
  firstName: "",
  lastName: "",
  email: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setAreaCode: (areaCode) => set({ areaCode }),
  setConfirm: (confirm) => set({ confirm }),
  setUser: (user) => set({ user }),
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
      const usersSnapshot = await firestore()
        .collection("users")
        .where("phoneNumber", "==", fullPhoneNumber)
        .get();

      if (!usersSnapshot.empty) {
        set({ loading: false });
        return { status: "ERROR", message: "El usuario ya existe" };
      }

      const userDocRef = firestore().collection("users").doc();
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
      console.error("Error al registrar el usuario:", error);
      set({ loading: false });
      return { status: "ERROR", message: error.message };
    }
  },

  signInWithPhoneNumber: async () => {
    const { phoneNumber, areaCode } = get();
    set({ loading: true });
    try {
      const fullPhoneNumber = areaCode + phoneNumber;
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      set({ confirm: confirmation, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      console.error("Error al enviar el código de verificación:", error);
      if (error?.code === "auth/too-many-requests") {
        return {
          success: false,
          message: "Demasiadas Solicitudes. Por favor, inténtelo más tarde.",
        };
      }
      return {
        success: false,
        message:
          "Error al enviar el código de verificación. Por favor, intenta nuevamente.",
      };
    }
  },

  confirmCode: async () => {
    const { confirm, code } = get();
    set({ loading: true });
    try {
      const userCredentials = await confirm.confirm(code);
      const user = userCredentials.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("userToken", token);
      set({ user, loading: false });
      return { status: "SUCCESS" };
    } catch (error) {
      set({ loading: false });
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
}));

export { useAuthStore };
