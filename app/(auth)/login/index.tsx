import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput as RNTextInput,
} from "react-native";
import { Background } from "@/components/container";
import { Button } from "@/components/button";
import { TextInput, Menu, Button as RNPButton } from "react-native-paper";
import { theme, globalStyles } from "@/theme";
import { styles } from "./styles";
import { router, useFocusEffect } from "expo-router";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [areaCode, setAreaCode] = useState("+54");
  const [menuVisible, setMenuVisible] = useState(false);

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

  const goToRegister = () => {
    router.push("register");
  };

  const login = () => {
    console.log("Login Process");
    router.push("(tabs)/create_events");
  };
  return (
    <Background>
      <SafeAreaView style={globalStyles.flex}>
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
              onPress={login}
              title={"Iniciar sesión"}
              labelStyle={styles.labelLogin}
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
      </SafeAreaView>
    </Background>
  );
}
