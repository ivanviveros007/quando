import { useState, useRef } from "react";
import { Image, FlatList, View, ImageSourcePropType, Text } from "react-native";

import { WINDOW_WIDTH, DATA_CAROUSEL_ONBOARDING as data } from "@constants";

import { Button } from "@/components/button";

import { router } from "expo-router";

import { styles } from "./styles";

import { globalStyles } from "@/theme";
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
      <View style={globalStyles.flex}>
        <Image style={styles.image} resizeMode="cover" source={item.image} />
      </View>

      <View style={styles.containerTitle}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      <View style={styles.containerDescription}>
        <Text style={styles.description}>{item.description}</Text>
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
    <View style={globalStyles.flex}>
      <View style={styles.containerOne}>
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
      </View>

      <View style={styles.containerTwo}>
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

        <View
          style={lastStep ? styles.lastStepButtons : styles.containerButtons}
        >
          {lastStep ? (
            <>
              <Button
                title="Iniciar sesión"
                onPress={goLogin}
                mode="contained"
              />

              <Button title="Registrarse" onPress={goSignUp} mode="outlined" />
            </>
          ) : (
            <>
              <Button
                title="Siguiente"
                onPress={goToNextPage}
                mode="contained"
              />
              <Button title="Saltar" onPress={skipSteps} mode="outlined" />
            </>
          )}
        </View>
      </View>
    </View>
  );
}
