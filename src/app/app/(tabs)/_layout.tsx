import { Tabs } from "expo-router";
import React from "react";
import { View, Dimensions } from "react-native";
import { TabBarIcon } from "@/src/components/tabBar/TabBarIcon";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";

import { Images } from "@/src/constants";
import { verticalScale, moderateScale } from "@/src/helpers";

import Svg, { Path } from "react-native-svg";
import { getPathDown } from "@/src/components/tabBar/curve";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { width } = Dimensions.get("window");
  const height = moderateScale(80);
  const centerWidth = moderateScale(60);

  return (
    <Tabs
      initialRouteName="create_events"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <Svg
            width={width}
            height={height}
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <Path
              d={getPathDown(width, height, centerWidth)}
              fill="rgba(0, 0, 0, 0.05)"
            />
          </Svg>
        ),
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
            <View style={{ bottom: verticalScale(15) }}>
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
