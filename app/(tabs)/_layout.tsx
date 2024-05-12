import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { Images } from "@constants";
import { verticalScale } from "@helpers";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          backgroundColor: "#fff",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create_events"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={{ bottom: verticalScale(10) }}>
              <Images.TabBar.PlusSvg />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="invitations"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="envelope-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
