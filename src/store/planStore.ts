import { create } from "zustand";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface Plan {
  id?: string;
  planType: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  guests: Contact[];
}

interface Contact {
  id: string;
  name: string;
  phoneNumbers?: { number: string }[];
  imageAvailable?: boolean;
  image?: { uri: string };
}

interface PlansState {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  addPlan: (plan: Plan) => Promise<void>;
  fetchPlans: () => Promise<void>;
}

const usePlansStore = create<PlansState>((set, get) => ({
  plans: [],
  loading: false,
  error: null,

  addPlan: async (plan: Plan) => {
    set({ loading: true });
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const userId = currentUser.uid;

      const planData = {
        ...plan,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection("plans")
        .doc(userId)
        .collection("userPlans")
        .add(planData);

      set((state) => ({
        plans: [...state.plans, plan],
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding plan:", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchPlans: async () => {
    set({ loading: true });
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const userId = currentUser.uid;

      const plansSnapshot = await firestore()
        .collection("plans")
        .doc(userId)
        .collection("userPlans")
        .get();

      const plans: Plan[] = plansSnapshot.docs.map((doc) => ({
        ...(doc.data() as Plan),
        id: doc.id,
      }));

      set({ plans, loading: false, error: null });
    } catch (error) {
      console.error("Error fetching plans:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export { usePlansStore };
