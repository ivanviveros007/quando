import { useState, useEffect } from "react";

import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/authStore";

export default function InitialScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const checkUserToken = useAuthStore((state) => state.checkUserToken);

  useEffect(() => {
    const checkToken = async () => {
      const tokenExists = await checkUserToken();
      setUserLoggedIn(tokenExists);
    };

    checkToken();
  }, []);

  if (userLoggedIn === null) {
    // Return a loading screen or null while checking the token
    return null;
  }

  if (userLoggedIn) {
    return <Redirect href="app/(tabs)" />;
  } else {
    return <Redirect href="(auth)/onboarding" />;
  }
}
