import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isToday,
} from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CalendarHeaderProps = {
  currentDate: Date | null;
  onDatePress: (date: Date) => void;
  onMonthChange?: (newMonth: Date) => void;
};

const daysOfWeek = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onDatePress,
  onMonthChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(currentDate || new Date())
  );
  const today = new Date();
  const flatListRef = useRef<FlatList<Date>>(null);

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const scrollToToday = () => {
    if (flatListRef.current) {
      const todayIndex = days.findIndex(
        (day) => format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      );
      if (todayIndex >= 0 && todayIndex < days.length) {
        flatListRef.current.scrollToItem({
          item: days[todayIndex],
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  };

  useEffect(() => {
    scrollToToday();
  }, [currentMonth]);

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  return (
    <View>
      <View style={styles.monthNavigation}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={20}
          color="black"
          onPress={handlePrevMonth}
        />
        <Text style={styles.monthText}>
          {capitalizeFirstLetter(
            format(currentMonth, "MMMM yyyy", { locale: es })
          )}
        </Text>

        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="black"
          onPress={handleNextMonth}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={days}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={({ item }: ListRenderItemInfo<Date>) => {
          const isSelected =
            currentDate &&
            format(item, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
          const isDisabled = isBefore(item, today) && !isToday(item);
          return (
            <TouchableOpacity
              onPress={() => !isDisabled && onDatePress(item)}
              disabled={isDisabled}
            >
              <View
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDayContainer,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText,
                    isDisabled && styles.disabledDayText,
                  ]}
                >
                  {format(item, "d")}
                </Text>
                <Text
                  style={[
                    styles.dayOfWeekText,
                    isSelected && styles.selectedDayText,
                    isDisabled && styles.disabledDayText,
                  ]}
                >
                  {daysOfWeek[item.getDay()]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  selectedDayContainer: {
    backgroundColor: "#4da6ff",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dayOfWeekText: {
    fontSize: 14,
    color: "grey",
  },
  selectedDayText: {
    color: "white",
  },
  disabledDayText: {
    color: "lightgrey",
  },
});

export default CalendarHeader;
