import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "@/src/components/button";
import { ThemedText } from "../../ThemedText";

import { globalStyles } from "@/src/theme";
import { router } from "expo-router";

import { theme } from "@/src/theme";
import { Images } from "@/src/constants";

import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

interface EmptyStatePlanProps {
  type?: "today" | "next";
}

export const EmptyStatePlan: FC<EmptyStatePlanProps> = ({ type }) => {
  const title = type === "today" ? "hoy" : "próximamente";
  return (
    <View style={styles.container}>
      <View>
        <Images.Home.Calendar style={{ alignSelf: "center" }} />
        <ThemedText style={[styles.title]}>No tienes planes {title}</ThemedText>

        <View style={styles.containerMessage}>
          <Text style={styles.start}>¡Empieza ahora!</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button
          title="Crear plan"
          variant="black"
          onPress={() => {
            router.push("create_events/template");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: moderateScale(40),
  },
  icon: {
    textAlign: "center",
    marginBottom: moderateScale(40),
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
  containerMessage: {
    marginTop: verticalScale(20),
    alignSelf: "center",
  },
  message: {
    fontSize: moderateScale(18),
    color: theme.colors.black,
    textAlign: "center",
  },
  containerButton: {
    flex: 0.1,
    width: horizontalScale(180),
  },
  start:{
    fontSize:20,
    fontFamily:'ManjariRegular',
  }
});
