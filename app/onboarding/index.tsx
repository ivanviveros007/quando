import { useState, useRef } from "react";
import { Image, FlatList, View, ImageSourcePropType } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { WINDOW_WIDTH, DATA_CAROUSEL_ONBOARDING as data } from "@constants";

import { Button } from "@/components/button";

import { router } from "expo-router";

import { styles } from "./styles";

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const goToNextPage = () => {
    const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    setActiveIndex(nextIndex);
  };

  const skipSteps = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
    setActiveIndex(data.length - 1);
  };

  const lastStep = activeIndex === data.length - 1;

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.containerRender}>
      <Image style={styles.image} resizeMode="cover" source={item.image} />
      <View style={styles.containerDescription}>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
      </View>
    </View>
  );

  const goLogin = () => {
    router.push("login");
  };

  const goSignUp = () => {
    router.push("register");
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute" }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / WINDOW_WIDTH
          );
          setActiveIndex(index);
        }}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      <View style={lastStep ? styles.lastStepButtons : styles.containerButtons}>
        {lastStep ? (
          <>
            <Button title="Iniciar sesión" onPress={goLogin} mode="contained" />

            <Button title="Registrarse" onPress={goSignUp} mode="outlined" />
          </>
        ) : (
          <>
            <Button title="Siguiente" onPress={goToNextPage} mode="contained" />
            <Button title="Saltar" onPress={skipSteps} mode="outlined" />
          </>
        )}
      </View>
    </ThemedView>
  );
}
