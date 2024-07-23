import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/authStore";
import * as Sentry from "@sentry/react-native";

export default function InitialScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const checkUserToken = useAuthStore((state) => state.checkUserToken);
  const getUserData = useAuthStore((state) => state.getUserData);
  const user = useAuthStore((state) => state.user);

  Sentry.init({
    dsn: "https://2860689487cf757def602f5ac9e68b2d@o4507653295046656.ingest.us.sentry.io/4507653329977344",
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenExists = await checkUserToken();
        if (tokenExists) {
          await getUserData();
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking user token:", error);
        setUserLoggedIn(false);
      }
    };

    checkToken();
  }, [user]);

  LogBox.ignoreLogs([
    "Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  ]);

  if (userLoggedIn === null) {
    // Return a loading screen or null while checking the token
    return null;
  }

  if (userLoggedIn) {
    return <Redirect href="(tabs)/home" />;
  } else {
    return <Redirect href="(auth)/onboarding" />;
  }
}
