import { create } from "zustand";
import firestore from "@react-native-firebase/firestore";

interface UserState {
  user: any | null;
  loading: boolean;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  getUserInfo: (uid: string) => Promise<any>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  getUserInfo: async (uid: string) => {
    set({ loading: true });
    try {
      const userDoc = await firestore().collection("users").doc(uid).get();
      if (userDoc.exists) {
        set({ user: userDoc.data(), loading: false });
        return { status: "SUCCESS", user: userDoc.data() };
      } else {
        set({ loading: false });
        return { status: "ERROR", message: "User not found" };
      }
    } catch (error) {
      console.error("Error getting user info:", error);
      set({ loading: false });
      return { status: "ERROR", message: error.message };
    }
  },
}));

export { useUserStore };
