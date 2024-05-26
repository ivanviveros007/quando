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
    // <View style={{ backgroundColor: "red" , flex:1}}>
    //   <Redirect href="/(auth)/onboarding" />
    // </View>
    <>
      <Stack.Screen
        options={{
          headerTitle: "Quando",
          title: "Quando",
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
            fontSize: 40,
            color: "red",
          },
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "white",
        }}
      />
      <Redirect href="/onboarding" />
    </>
  );
}
