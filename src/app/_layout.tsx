import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
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
    ManjariBold: require("../../assets/fonts/Manjari-Bold.ttf"),
    ManjariRegular: require("../../assets/fonts/Manjari-Regular.ttf"),
    ManjariThin: require("../../assets/fonts/Manjari-Thin.ttf"),
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

  const linking = {
    prefixes: [
      "myapp://",
      "https://quandoapp.page.link",
      "https://quandoapp.com",
      "https://*.quandoapp.com",
    ],
    config: {
      screens: {
        "(auth)": {
          screens: {
            onboarding: "onboarding/index",
            login: "login/index",
            otp: "otp/index",
            register: "register/index",
          },
        },
        "(tabs)": {
          screens: {
            home: "home/index",
            profile: "profile/index",
            calendar: "calendar/index",
            create_events: "create_events/index",
            invitations: "invitations/index",
          },
        },
        confirmation: "confirmation",
        plan_detail: "plan_detail",
        not_found: "*",
      },
    },
  };

  return (
    <PaperProvider theme={theme} settings={{ rippleEffectEnabled: false }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={defaultScreenOptions}
            linking={linking}
          />
          {/* Auth Screens */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/* App Screens */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="confirmation"
            options={{
              headerShown: false,
              presentation: "containedModal",
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="plan_detail"
            options={{
              headerShown: true,
              headerBackTitleVisible: false,
              // headerBackTitle: "",
              title: "",
              headerTitle: "",
              headerTitleStyle: { fontFamily: "RobotoMedium" },
              headerTintColor: theme.colors.black,
              headerTransparent: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
