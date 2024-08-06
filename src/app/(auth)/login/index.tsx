import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  Alert,
  Keyboard,
} from "react-native";
import { Background } from "@/src/components/container";
import { Button } from "@/src/components/button";
import { TextInput, Menu, Button as RNPButton } from "react-native-paper";
import { theme } from "@/src/theme";
import { styles } from "./styles";
import { router, useFocusEffect } from "expo-router";
import { useAuthStore } from "@/src/store/authStore";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { Images } from "@/src/constants";
import { ThemedText } from "@/src/components/ThemedText";
import { moderateScale } from "@/src/helpers";

export default function Login() {
  const [menuVisible, setMenuVisible] = useState(false);

  const {
    phoneNumber,
    areaCode,
    setPhoneNumber,
    setAreaCode,
    signInWithPhoneNumber,
    registerUser,
    loading,
    checkUserExists,
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

  const getCountryCodeFromAreaCode = (
    areaCode: string
  ): CountryCode | undefined => {
    switch (areaCode) {
      case "+34":
        return "ES";
      case "+54":
        return "AR";
      // Añade otros casos según sea necesario
      default:
        return undefined;
    }
  };

  const isValidPhoneNumber = (number: string, areaCode: string) => {
    const countryCode = getCountryCodeFromAreaCode(areaCode);
    const phoneNumber = parsePhoneNumberFromString(number, {
      defaultCountry: countryCode,
    });
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const handleLoginOrRegister = async () => {
    Keyboard.dismiss();
    if (!isValidPhoneNumber(phoneNumber, areaCode)) {
      Alert.alert(
        "Número Inválido",
        "Por favor, ingresa un número de teléfono válido"
      );
      return;
    }

    const fullPhoneNumber = areaCode + phoneNumber;
    const userExists = await checkUserExists(fullPhoneNumber);

    const result = await signInWithPhoneNumber();

    if (result.success) {
      if (!userExists) {
        const registerResult = await registerUser();
        if (registerResult.status !== "SUCCESS") {
          Alert.alert("Error", registerResult.message);
          return;
        }
      }

      router.push("otp");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <Background>
      <View style={styles.containerLogo}>
        <Images.General.LogoWhite
          width={moderateScale(97)}
          height={moderateScale(22)}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <ThemedText
            style={styles.subtitle}
          >{`Tan simple como loguearte \ncon tu número de móvil`}</ThemedText>
        </View>

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
          >
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
            // maxLength={areaCode === "+54" ? 10 : 9}
            theme={{
              colors: {
                primary: theme.colors.white,
                background: "transparent",
                placeholder: theme.colors.white,
                text: theme.colors.white,
              },
              roundness: 10,
            }}
            placeholderTextColor={theme.colors.white}
            activeOutlineColor={theme.colors.white}
            outlineColor={theme.colors.white}
            textColor={theme.colors.white}
            keyboardAppearance="dark"
            outlineStyle={{ borderWidth: 1 }}
          />
        </View>
        <View style={styles.login}>
          <Button
            mode="contained"
            onPress={handleLoginOrRegister}
            title={"Iniciar sesión"}
            labelStyle={styles.labelLogin}
            disabled={loading}
            loading={loading}
          />
        </View>
      </View>
    </Background>
  );
}
