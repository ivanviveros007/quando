import React from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { useRouter, useSegments } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/src/constants/Colors";
import { verticalScale } from "@/src/helpers";
import { Images } from "@/src/constants";

interface TabBarIconProps {
  name: string;
  color: string;
}

function TabBarIcon({ name, color }: TabBarIconProps) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  );
}

const CustomTabBar = () => {
  const router = useRouter();
  const segments = useSegments();
  const { width } = Dimensions.get("window");

  const tabs = [
    { name: "Calendar", route: "calendar", iconName: "calendar" },
    { name: "CreateEvent", route: "create_events", iconName: "plus" },
    { name: "Invitations", route: "invitations", iconName: "envelope-o" },
  ];

  return (
    <View style={[styles.tabBarContainer, { width }]}>
      {tabs.map((tab, index) => {
        const isFocused = segments.includes(tab.route);
        return (
          <Pressable
            key={index}
            onPress={() => router.push(tab.route)}
            style={styles.tabButton}
          >
            {index === 1 ? (
              <View style={{ bottom: verticalScale(35) }}>
                <Images.TabBar.PlusSvg
                  color={isFocused ? Colors.light.tint : "gray"}
                />
              </View>
            ) : (
              <>
                <TabBarIcon
                  name={tab.iconName}
                  color={isFocused ? Colors.light.tint : "gray"}
                />
                <Text style={{ color: isFocused ? Colors.light.tint : "gray" }}>
                  {tab.name}
                </Text>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: verticalScale(10),
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabButton: {
    alignItems: "center",
  },
});

export default CustomTabBar;
