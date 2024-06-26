import { Stack } from "expo-router";
import { theme } from "@/src/theme";
import { moderateScale } from "@/src/helpers";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
    </Stack>
  );
}
