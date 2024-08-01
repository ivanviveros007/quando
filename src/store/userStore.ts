import { create } from "zustand";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import * as FileSystem from "expo-file-system";
// import * as Sentry from "@sentry/react-native";
interface UserState {
  additionalInfo: Record<string, any>;
  loading: boolean;
  setAdditionalInfo: (info: Record<string, any>) => void;
  fetchAdditionalInfo: () => Promise<void>;
  updateAdditionalInfo: (info: Record<string, any>) => Promise<void>;
  uploadProfilePicture: (uri: string) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  additionalInfo: {},
  loading: false,
  setAdditionalInfo: (info) => set({ additionalInfo: info }),
  fetchAdditionalInfo: async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      set({ loading: true });
      try {
        const userDoc = await firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          set({ additionalInfo: userData, loading: false });
        } else {
          set({ additionalInfo: {}, loading: false });
        }
      } catch (error) {
        console.error("Error fetching additional user info:", error);
        set({ loading: false });
        // Sentry.captureException({
        //   message: "Error al obtener la información adicional del usuario",
        //   error,
        // });
      }
    }
  },
  updateAdditionalInfo: async (info) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      set({ loading: true });
      try {
        await firestore().collection("users").doc(currentUser.uid).update(info);
        set({
          additionalInfo: { ...get().additionalInfo, ...info },
          loading: false,
        });
      } catch (error) {
        console.error("Error updating additional user info:", error);
        set({ loading: false });
      }
    }
  },
  uploadProfilePicture: async (uri: string) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      set({ loading: true });
      try {
        const storageRef = storage().ref(
          `profile_pictures/${currentUser.uid}.jpg`
        );

        // Verificar que el archivo existe
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          throw new Error("El archivo no existe en la ruta especificada.");
        }

        // Subir el archivo a Firebase Storage
        await storageRef.putFile(uri);
        const photoURL = await storageRef.getDownloadURL();

        // Actualizar la URL de la foto en Firestore
        await firestore()
          .collection("users")
          .doc(currentUser.uid)
          .update({ photoURL });
        set({
          additionalInfo: { ...get().additionalInfo, photoURL },
          loading: false,
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        set({ loading: false });

        // Sentry.captureException({
        //   message: "Error al subir la foto de perfil",
        //   error,
        // });
      }
    }
  },
}));

export { useUserStore };
