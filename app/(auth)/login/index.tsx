import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput as RNTextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Background } from "@/components/container";
import { Button } from "@/components/button";
import { TextInput, Menu, Button as RNPButton } from "react-native-paper";
import { theme } from "@/theme";
import { styles } from "./styles";
import { router, useFocusEffect } from "expo-router";

import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const [menuVisible, setMenuVisible] = useState(false);

  const {
    phoneNumber,
    areaCode,
    setPhoneNumber,
    setAreaCode,
    signInWithPhoneNumber,
    loading,
  } = useAuthStore();

  const textInputRef = useRef<RNTextInput>(null);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useFocusEffect(
    useCallback(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, [])
  );
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleLogin = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert(
        "Número Inválido",
        "Por favor, ingresa un número de teléfono válido"
      );
      return;
    }

    const result = await signInWithPhoneNumber();
    if (result.success) {
      router.push("otp");
    } else {
      Alert.alert(result.title, result.message);
    }
  };

  const goToRegister = () => {
    router.push("register");
  };

  return (
    <Background>
      <SafeAreaView>
        <ScrollView automaticallyAdjustKeyboardInsets>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text
              style={styles.subtitle}
            >{`Tan simple como loguearte \ncon tu número de móvil`}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <RNPButton
                    mode="outlined"
                    onPress={openMenu}
                    style={styles.areaButton}
                    textColor="white"
                  >
                    {areaCode}
                  </RNPButton>
                }
                theme={{
                  roundness: 20,
                }}
              >
                <Menu.Item
                  onPress={() => {
                    setAreaCode("+54");
                    closeMenu();
                  }}
                  title="+54 Argentina"
                  titleStyle={{
                    fontFamily: "RobotoBold",
                  }}
                />
                <Menu.Item
                  onPress={() => {
                    setAreaCode("+34");
                    closeMenu();
                  }}
                  title="+34 España"
                  titleStyle={{
                    fontFamily: "RobotoBold",
                  }}
                />
              </Menu>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                mode="outlined"
                focusable={true}
                value={phoneNumber}
                label={""}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder={"Número de móvil"}
                autoFocus={true}
                onSubmitEditing={() => console.log("Login Process")}
                keyboardType={"phone-pad"}
                maxLength={10}
                theme={{
                  colors: {
                    primary: theme.colors.white,

                    background: "transparent",
                    placeholder: theme.colors.white,
                    text: theme.colors.white,
                  },
                  roundness: theme.spacing.lg,
                }}
                placeholderTextColor={theme.colors.white}
                activeOutlineColor={theme.colors.white}
                outlineColor={theme.colors.white}
                textColor={theme.colors.white}
                keyboardAppearance="dark"
              />
            </View>
            <View style={styles.login}>
              <Button
                mode="contained"
                onPress={handleLogin}
                title={"Iniciar sesión"}
                labelStyle={styles.labelLogin}
                disabled={loading}
              />
            </View>

            <View style={styles.register}>
              <Button
                mode="outlined"
                onPress={goToRegister}
                title={"Quiero crear una cuenta"}
                labelStyle={styles.labelRegister}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
