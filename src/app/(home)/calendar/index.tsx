import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import CalendarHeader from "@/src/components/calendar";
import { format, startOfMonth, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from "@/src/utils";

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());

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

  return (
    <ThemedView style={styles.container}>
      <CalendarHeader
        currentDate={currentDate}
        onDatePress={handleDatePress}
        onMonthChange={handleMonthChange}
      />
      {currentDate ? (
        <ThemedText style={styles.currentDateText}>{formattedDate}</ThemedText>
      ) : (
        <ThemedText style={styles.currentDateText}>
          Ninguna fecha seleccionada
        </ThemedText>
      )}
      {/* Aquí puedes agregar tus eventos del día */}
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
});
