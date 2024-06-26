import { useState, useEffect } from "react";

import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/authStore";

export default function InitialScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const checkUserToken = useAuthStore((state) => state.checkUserToken);
  const getUserData = useAuthStore((state) => state.getUserData);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const checkToken = async () => {
      const tokenExists = await checkUserToken();
      if (tokenExists) {
        await getUserData();
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    };

    checkToken();
  }, [user]);

  if (userLoggedIn === null) {
    // Return a loading screen or null while checking the token
    return null;
  }

  if (userLoggedIn) {
    return <Redirect href="(home)/home" />;
  } else {
    return <Redirect href="(auth)/onboarding" />;
  }
}
