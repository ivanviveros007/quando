import { Stack } from "expo-router";
import { theme } from "@/src/theme";
import { moderateScale } from "@/src/helpers";

export default function CreateEventsLayout() {
  return (
    <Stack initialRouteName="template/index">
      <Stack.Screen
        name="contacts/index"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="map/index"
        options={{
          headerShown: false,
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
          headerBackTitle: "",
          headerBackTitleVisible: true,
          headerTintColor: "black",
          headerBackVisible: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
