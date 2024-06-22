import { Stack } from "expo-router";
import { theme } from "@/src/theme";
import { moderateScale } from "@/src/helpers";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login/index"
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
        }}
      />
      <Stack.Screen
        name="otp/index"
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
        }}
      />
    </Stack>
  );
}
