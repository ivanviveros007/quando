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
  setPhoneNumber: (phoneNumber: string) => void;
  setAreaCode: (areaCode: string) => void;
  setConfirm: (confirm: any | null) => void;
  setUser: (user: any | null) => void;
  setCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
  signInWithPhoneNumber: () => Promise<any | null>;
  confirmCode: () => Promise<string | null>;
  checkUserToken: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  areaCode: "+54",
  confirm: null,
  user: null,
  code: "",
  loading: false,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setAreaCode: (areaCode) => set({ areaCode }),
  setConfirm: (confirm) => set({ confirm }),
  setUser: (user) => set({ user }),
  setCode: (code) => set({ code }),
  setLoading: (loading) => set({ loading }),

  signInWithPhoneNumber: async () => {
    const { phoneNumber, areaCode } = get();
    set({ loading: true });
    try {
      console.log(`Enviando SMS a: ${areaCode}${phoneNumber}`);
      const fullPhoneNumber = areaCode + phoneNumber;
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      console.log("Confirmación recibida:", confirmation);
      set({ confirm: confirmation, loading: false });
      return confirmation;
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
      set({ loading: false });
      return null;
    }
  },

  confirmCode: async () => {
    const { confirm, code } = get();
    set({ loading: true });
    try {
      console.log(`Confirmando código: ${code}`);
      const userCredentials = await confirm.confirm(code);
      const user = userCredentials.user;
      console.log("Usuario autenticado:", user);

      const token = await user.getIdToken();
      console.log("Token de usuario:", token);

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        console.log("Usuario ya existe en la base de datos");
        set({ user, loading: false });
        await AsyncStorage.setItem("userToken", token);
        console.log("Token almacenado en AsyncStorage:", token);
        return "EXISTING_USER";
      } else {
        console.log(
          "Usuario no existe en la base de datos. Creando nuevo usuario."
        );
        await firestore()
          .collection("users")
          .doc(user.uid)
          .set({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: "",
            photoURL: "",
            email: "",
            emailVerified: false,
            isAnonymous: false,
            metadata: {
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
            },
          });
        set({ user, loading: false });
        await AsyncStorage.setItem("userToken", token);
        console.log("Token almacenado en AsyncStorage:", token);
        return "NEW_USER";
      }
    } catch (error) {
      console.error("Error al confirmar el código:", error);
      set({ loading: false });
      return null;
    }
  },

  checkUserToken: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token encontrado en AsyncStorage:", token);
      return token !== null;
    } catch (error) {
      console.error("Error al verificar el token en AsyncStorage:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("Token eliminado de AsyncStorage");
      set({ user: null });
    } catch (error) {
      console.error("Error al eliminar el token de AsyncStorage:", error);
    }
  },
}));

export { useAuthStore };
