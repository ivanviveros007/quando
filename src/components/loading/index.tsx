import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { Images } from "@/src/constants";

export const Loading: React.FC = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      {
        iterations: -1,
      }
    ).start();
  });
  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"],
            }),
          },
          {
            perspective: 1000,
          },
        ],
      }}
    >
      <Images.General.Spinner />
    </Animated.View>
  );
};

export const LoadingScreen: React.FC<> = () => {
  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
});
