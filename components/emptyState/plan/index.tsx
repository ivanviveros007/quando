import { StyleSheet, View, Text } from "react-native";
import { Button } from "@/components/button";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "@theme";
import { router } from "expo-router";

import { theme } from "@theme";

import { moderateScale, verticalScale, horizontalScale } from "@helpers";

export const EmptyStatePlan = () => {
  return (
    <View style={styles.container}>
      <View>
        <AntDesign
          name="calendar"
          size={moderateScale(200)}
          color="lightgrey"
          style={styles.icon}
        />
        <Text style={[globalStyles.text_fs20_black_bold, styles.title]}>
          No tienes planes hoy
        </Text>

        <View style={styles.containerMessage}>
          <Text style={globalStyles.text_fs18_black}>¡Empieza ahora!</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button
          title="Crear plan"
          variant="black"
          onPress={() => {
            router.push("template");
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
    backgroundColor: theme.colors.white,
    flexDirection: "column",
    gap: moderateScale(40),
  },
  icon: {
    textAlign: "center",
    marginBottom: moderateScale(40),
  },
  title: {
    textAlign: "center",
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
    width: horizontalScale(200),
  },
});
