import { create } from "zustand";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import * as FileSystem from "expo-file-system";
import * as Calendar from "expo-calendar";
import * as Sentry from "@sentry/react-native";

interface Plan {
  id?: string;
  planType: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  guests: Contact[];
  imageUri?: string;
}

export interface Contact {
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
  deletePlan: (planId: string) => Promise<void>;
  updatePlan: (planId: string, plan: Plan) => Promise<void>;
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

      let imageUrl = "";
      if (plan.imageUri) {
        const storageRef = storage().ref(`plans/${userId}/${Date.now()}.jpg`);

        const fileInfo = await FileSystem.getInfoAsync(plan.imageUri);
        if (!fileInfo.exists) {
          throw new Error("El archivo no existe en la ruta especificada.");
        }

        await storageRef.putFile(plan.imageUri);
        imageUrl = storageRef.fullPath; // Guardar la ruta completa sin el token
      }

      const planData = {
        ...plan,
        imageUri: imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection("plans")
        .doc(userId)
        .collection("userPlans")
        .add(planData);

      await addEventToCalendar(plan);

      set((state) => ({
        plans: [...state.plans, planData],
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding plan:", error);
      set({ loading: false, error: error.message });
      Sentry.captureException({
        message: "Error al agregar el plan",
        error,
      });
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
      Sentry.captureException({
        message: "Error al obtener los planes",
        error,
      });
    }
  },

  deletePlan: async (planId: string) => {
    set({ loading: true });
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const userId = currentUser.uid;

      const planRef = firestore()
        .collection("plans")
        .doc(userId)
        .collection("userPlans")
        .doc(planId);

      const planDoc = await planRef.get();
      if (!planDoc.exists) {
        throw new Error("Plan not found");
      }

      const planData = planDoc.data() as Plan;

      // Eliminar imagen de storage si existe
      if (planData.imageUri) {
        const storageRef = storage().ref(planData.imageUri);
        try {
          await storageRef.delete();
        } catch (error) {
          if (error.code !== "storage/object-not-found") {
            console.log("Error deleting image:", error);
          }
        }
      }

      // Eliminar el plan de Firestore
      await planRef.delete();

      // Eliminar evento del calendario
      await removeEventFromCalendar(planId);

      set((state) => ({
        plans: state.plans.filter((plan) => plan.id !== planId),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting plan:", error);
      set({ loading: false, error: error.message });
      Sentry.captureException({
        message: "Error al eliminar el plan",
        error,
      });
    }
  },
  updatePlan: async (planId: string, updatedPlan: Plan) => {
    set({ loading: true });
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const userId = currentUser.uid;

      let imageUrl = updatedPlan.imageUri;
      if (
        updatedPlan.imageUri &&
        !updatedPlan.imageUri.startsWith("https://")
      ) {
        const storageRef = storage().ref(`plans/${userId}/${Date.now()}.jpg`);
        const fileInfo = await FileSystem.getInfoAsync(updatedPlan.imageUri);
        if (!fileInfo.exists) {
          throw new Error("El archivo no existe en la ruta especificada.");
        }
        await storageRef.putFile(updatedPlan.imageUri);
        imageUrl = storageRef.fullPath;
      }

      const planData = {
        ...updatedPlan,
        imageUri: imageUrl,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection("plans")
        .doc(userId)
        .collection("userPlans")
        .doc(planId)
        .update(planData);

      set((state) => ({
        plans: state.plans.map((plan) =>
          plan.id === planId ? { ...plan, ...planData } : plan
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
      set({ loading: false, error: error.message });
      Sentry.captureException({
        message: "Error al actualizar el plan",
        error,
      });
    }
  },
}));

const addEventToCalendar = async (plan: Plan) => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permiso para acceder al calendario denegado.");
    }

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar = calendars.find((cal) => cal.allowsModifications);

    if (!defaultCalendar) {
      throw new Error("No se encontró un calendario predeterminado.");
    }

    const startDate = new Date(`${plan.date}T${plan.time}:00`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Duración de 1 hora

    const details = {
      title: plan.title,
      startDate,
      endDate,
      location: plan.location,
      notes: plan.description,
      timeZone: "UTC",
    };

    await Calendar.createEventAsync(defaultCalendar.id, details);
  } catch (error) {
    Sentry.captureException({
      message: "Error al agregar evento al calendario",
      error,
    });

    console.error("Error adding event to calendar:", error);
    throw error;
  }
};

const removeEventFromCalendar = async (planId: string) => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permiso para acceder al calendario denegado.");
    }

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const calendarIds = calendars.map((cal) => cal.id);

    if (calendarIds.length === 0) {
      throw new Error("No se encontraron calendarios para buscar eventos.");
    }

    const events = await Calendar.getEventsAsync(
      calendarIds,
      new Date("2000-01-01"), // Fecha inicial para buscar eventos
      new Date("2100-01-01") // Fecha final para buscar eventos
    );

    const eventToDelete = events.find((event) => event.notes?.includes(planId));

    if (eventToDelete) {
      await Calendar.deleteEventAsync(eventToDelete.id);
    }
  } catch (error) {
    Sentry.captureException({
      message: "Error al eliminar evento del calendario",
      error,
    });
    console.error("Error deleting event from calendar:", error);
    throw error;
  }
};

export { usePlansStore };
