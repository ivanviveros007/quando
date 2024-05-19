import React, { useState, useRef, useCallback } from "react";
import { View, Text, TextInput as RNTextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@/components/button";
import { TextInput, Button as RNPButton } from "react-native-paper";
import { theme } from "@/theme";

import { styles } from "./styles";

export default function RegisterScreen() {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const textInputRefs = useRef(Array(4).fill(null));

  useFocusEffect(
    useCallback(() => {
      if (textInputRefs.current[0]) {
        textInputRefs.current[0].focus();
      }
    }, [])
  );

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      textInputRefs.current[index + 1].focus();
    }
  };

  const handleContinue = () => {
    console.log("OTP:", otp.join(""));
    // Lógica para continuar con el proceso de registro
  };

  const handleResendCode = () => {
    console.log("Reenviar código");
    // Lógica para reenviar el código OTP
  };

  const goToLogin = () => {
    // Navega a la pantalla de login
    router.push("login");
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>
          {` Te enviamos un SMS a \n+54 011 1234 1234 con un \ncódigo de acceso. Ingrésalo abajo.`}
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
      <View style={styles.buttonContainer}>
        <View style={styles.cointainerButton}>
          <Button
            mode="contained"
            onPress={handleContinue}
            title="Reenviar código"
            labelStyle={styles.buttonLabel}
          />
        </View>

        <Button
          mode="outlined"
          onPress={handleResendCode}
          title="Salir"
          labelStyle={styles.buttonLabel}
        />
      </View>
    </View>
  );
}
