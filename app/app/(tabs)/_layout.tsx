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
      initialRouteName="create_events"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
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
          headerShadowVisible: false,
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
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="invitations"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="envelope-o" color={color} />
          ),
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
