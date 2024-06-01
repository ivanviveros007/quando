import { useState } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";

export default function InitialScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // if (userLoggedIn) {
  //   return <Redirect href="/(auth)/login" />;
  // } else {
  //   return <Redirect href="/(auth)/onboarding" />;
  // }

  return (
    <>
      <Redirect href="/login" />
    </>
  );
}
