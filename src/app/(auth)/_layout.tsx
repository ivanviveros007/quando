import { Stack } from "expo-router";
import { theme } from "@/src/theme";
import { moderateScale } from "@/src/helpers";
import { Images } from "@/src/constants";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login/index">
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login/index"
        options={{
          headerTitle: "",
          title: "",

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
      <Stack.Screen
        name="register/index"
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
