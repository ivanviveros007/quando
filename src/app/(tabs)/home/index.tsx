import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { useAuthStore } from "@/src/store/authStore";
import { Images } from "@/src/constants";
import { CardEvent } from "@/src/components/cardEvent";
import { Colors } from "@/src/constants";
import { router } from "expo-router";
import { usePlansStore } from "@/src/store/planStore";
import { isToday, isAfter, parseISO } from "date-fns";
import { EmptyStatePlan } from "@/src/components/emptyState";

export default function HomeScreen() {
  const fetchPlans = usePlansStore((state) => state.fetchPlans);
  const plans = usePlansStore((state) => state.plans);
  const loading = usePlansStore((state) => state.loading);
  const error = usePlansStore((state) => state.error);
  const user = useAuthStore((state) => state.user);

  const [filter, setFilter] = useState("all");
  const [filteredPlans, setFilteredPlans] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  useEffect(() => {
    let filtered = plans;
    const today = new Date();

    if (filter === "today") {
      filtered = plans.filter((plan) => isToday(parseISO(plan.date)));
    } else if (filter === "upcoming") {
      filtered = plans.filter((plan) => isAfter(parseISO(plan.date), today));
    }

    setFilteredPlans(filtered);

    Animated.timing(animation, {
      toValue: filter === "today" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [filter, plans]);

  const backgroundColorToday = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary_pruple, "white"],
  });

  const textColorToday = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "black"],
  });

  const backgroundColorUpcoming = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", Colors.primary_pruple],
  });

  const textColorUpcoming = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["black", "white"],
  });

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <CardEvent
          title={item.title}
          location={item.location}
          time={item.time}
          guests={item.guests}
          date={item.date}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingScreen}>
        <View style={styles.header}>
          <Images.Home.LogoHome />
          <TouchableOpacity
            onPress={() => {
              router.push("(tabs)/profile");
            }}
          >
            <Images.Home.User />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTitle}>
          <ThemedText style={styles.title}>Bienvenido a tu </ThemedText>
          <ThemedText style={[styles.title, styles.color]}>
            agenda social{" "}
          </ThemedText>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilter("today")}
          >
            <Animated.View
              style={[
                styles.animatedButton,
                { backgroundColor: backgroundColorToday },
              ]}
            >
              <Animated.Text style={{ color: textColorToday }}>
                Hoy
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilter("upcoming")}
          >
            <Animated.View
              style={[
                styles.animatedButton,
                { backgroundColor: backgroundColorUpcoming },
              ]}
            >
              <Animated.Text style={{ color: textColorUpcoming }}>
                Próximos
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center", marginTop: 30 }}>
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}
          {!loading && !error && (
            <FlatList
              data={filteredPlans}
              keyExtractor={(item) => item.id ?? ""}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={<EmptyStatePlan />}

            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  paddingScreen: {
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTitle: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "RobotoBold",
  },
  color: {
    color: "#8767F2",
  },
  filtersContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  filterButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary_black,
    width: 100,
  },
  animatedButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
