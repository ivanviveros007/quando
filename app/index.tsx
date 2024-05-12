import { useState } from "react";
import { Redirect } from "expo-router";

export default function InitalScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  if (!userLoggedIn) {
    return <Redirect href="(tabs)/create_events" />;
  } else {
    return <Redirect href="onboarding" />;
  }
}
