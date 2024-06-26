import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/useColorScheme";

import { Provider as PaperProvider } from "react-native-paper";

import { theme } from "@/src/theme";

export const unstable_settings = {
  initialRouteName: "index",
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
    RobotoThin: require("../../assets/fonts/Roboto-Thin.ttf"),
    RobotoBlack: require("../../assets/fonts/Roboto-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const defaultScreenOptions: React.ComponentProps<
    typeof Stack.Screen
  >["options"] = {
    headerShown: false,
  };

  return (
    <PaperProvider theme={theme} settings={{ rippleEffectEnabled: false }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={defaultScreenOptions} />
          {/* Auth Screens */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/* App Screens */}
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
