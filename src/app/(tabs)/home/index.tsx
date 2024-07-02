import { StyleSheet } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Images } from "@/src/constants";
import { verticalScale } from "@/src/helpers";
import { CardEvent } from "@/src/components/cardEvent";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants";
import { router } from "expo-router";

export default function HomeScreen() {
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

        <View>
          <CardEvent />
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
});
