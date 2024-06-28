import { Stack } from "expo-router";
import { theme } from "@/src/theme";
import { moderateScale } from "@/src/helpers";

export default function CreateEventsLayout() {
  return (
    <Stack initialRouteName="template/index">
      <Stack.Screen
        name="contacts/index"
        options={{
          headerTitle: "Quando",
          title: "Quando",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: moderateScale(24),
            color: theme.colors.black,
          },
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "white",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="map/index"
        options={{
          headerTitle: "Quando",
          title: "Quando",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: moderateScale(24),
            color: theme.colors.black,
          },
          headerBackTitle: "Login",
          headerBackTitleVisible: true,
          headerTintColor: "black",
          headerBackVisible: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="template/index"
        options={{
          headerTitle: "",
          title: "",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: moderateScale(24),
            color: theme.colors.black,
          },
          headerBackTitle: "Login",
          headerBackTitleVisible: true,
          headerTintColor: "black",
          headerBackVisible: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
