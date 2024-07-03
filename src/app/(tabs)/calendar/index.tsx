import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import CalendarHeader from "@/src/components/calendar";
import { format, startOfMonth, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from "@/src/utils";
import { usePlansStore } from "@/src/store/planStore";
import { useAuthStore } from "@/src/store/authStore";
import { CardEvent } from "@/src/components/cardEvent";
import { isToday, isAfter, parseISO } from "date-fns";

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [filteredPlans, setFilteredPlans] = useState([]);
  const fetchPlans = usePlansStore((state) => state.fetchPlans);
  const plans = usePlansStore((state) => state.plans);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  useEffect(() => {
    if (currentDate) {
      const filtered = plans.filter((plan) =>
        isSameDay(parseISO(plan.date), currentDate)
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans([]);
    }
  }, [currentDate, plans]);

  const handleDatePress = (date: Date) => {
    if (currentDate && isSameDay(currentDate, date)) {
      setCurrentDate(null); // Deseleccionar si el mismo día es presionado
    } else {
      setCurrentDate(date);
    }
  };

  const handleMonthChange = (newMonth: Date) => {
    setCurrentDate(startOfMonth(newMonth));
  };

  const formattedDate = currentDate
    ? capitalizeFirstLetter(format(currentDate, "d MMMM yyyy", { locale: es }))
    : capitalizeFirstLetter(format(new Date(), "MMMM yyyy", { locale: es }));

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10, alignSelf: "center" }}>
        <CardEvent
          title={item.title}
          location={item.location}
          time={item.time}
          guests={item.guests}
          date={item.date}
          imageUri={item.imageUri}
        />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <CalendarHeader
        currentDate={currentDate}
        onDatePress={handleDatePress}
        onMonthChange={handleMonthChange}
      />
      {!currentDate && (
        <ThemedText style={styles.currentDateText}>
          Ninguna fecha seleccionada
        </ThemedText>
      )}
      <FlatList
        data={filteredPlans}
        keyExtractor={(item) => item.id ?? ""}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 200 }}>
            No hay eventos para esta fecha.
          </Text>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  currentDateText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
});
