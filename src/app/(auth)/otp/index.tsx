import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@/src/components/button";
import { TextInput } from "react-native-paper";
import { theme } from "@/src/theme";
import { styles } from "./styles";
import { useAuthStore } from "@/src/store/authStore";
4;
import { useRouter } from "expo-router";

export default function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const textInputRefs = useRef(Array(6).fill(null));
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setCode, confirmCode, loading, areaCode, phoneNumber } =
    useAuthStore();
  console.log("phoneNumber", phoneNumber);
  useFocusEffect(
    useCallback(() => {
      if (textInputRefs.current[0]) {
        textInputRefs.current[0].focus();
      }
    }, [])
  );

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      textInputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      textInputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    const otpCode = otp.join("");
    setCode(otpCode);
    const result = await confirmCode();
    // if (result?.status === "EXISTING_USER") {
    //   router.push("(tabs)/create_events");
    // } else if (result.status === "NEW_USER") {
    //   router.push("register");
    // } else if (result.status === "ERROR") {
    //   setErrorMessage(result?.message);
    // }
    if (result) {
      router.push("(home)/home");
    }
  };

  const handleResendCode = () => {
    console.log("Reenviar código");
    // Lógica para reenviar el código OTP
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>
          {`Te enviamos un SMS a \n ${areaCode} ${phoneNumber} con un \ncódigo de acceso. Ingrésalo abajo.`}
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (textInputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(index, nativeEvent.key)
            }
            keyboardType="number-pad"
            maxLength={1}
            theme={{
              colors: {
                primary: theme.colors.purple,
                text: theme.colors.purple,
                accent: theme.colors.purple,
              },
            }}
            underlineStyle={styles.underlineStyle}
          />
        ))}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={handleContinue}
            title="Continuar"
            labelStyle={styles.buttonLabel}
            disabled={loading}
            loading={loading}
          />
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color={theme.colors.light_blue}
            style={{ marginTop: 20 }}
          />
        )}
        <Button
          mode="outlined"
          onPress={handleResendCode}
          title="Reenviar código"
          labelStyle={styles.buttonLabel}
        />
      </View>
    </View>
  );
}
