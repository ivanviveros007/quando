import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/src/components/tabBar/TabBarIcon";
import { Colors } from "@/src/constants";
import { verticalScale } from "@/src/helpers";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors.primary_light_blue,
        tabBarInactiveTintColor: Colors.primary_black,
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
          borderTopWidth: 0,
          paddingTop: 5,
          height: verticalScale(70),
        },
        tabBarIconStyle: {
          marginTop: verticalScale(5),
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-filled" color={color} />
          ),
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-month" color={color} />
          ),
          headerShadowVisible: false,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="create_events"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="invitations/index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="email" color={color} />,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
