import React, { useState, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@/src/components/button";
import { theme } from "@/src/theme";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";
import { Colors } from "@/src/constants";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setCode, confirmCode, loading, areaCode, phoneNumber } =
    useAuthStore();
  console.log("phoneNumber desde otp", phoneNumber);

  console.log("OTP", otp);

  useFocusEffect(
    useCallback(() => {
      if (otp.length === 0) {
        // Auto-focus on load is handled by the OTPInputView
      }
    }, [])
  );

  const handleContinue = async () => {
    setCode(otp);
    const result = await confirmCode();
    if (result) {
      router.push("(tabs)/home");
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
      <OTPInputView
        style={styles.otpInputView}
        pinCount={6}
        code={otp}
        onCodeChanged={(code) => setOtp(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpInput}
        codeInputHighlightStyle={styles.otpInputHighlight}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  containerTitle: {
    bottom: 10,
    alignItems: "center",
    top: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  otpInputView: {
    width: "80%",
    height: 200,
    alignSelf: "center",
    top: 50,
  },
  otpInput: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 3,
    color: Colors.purple_dark,
    fontSize: 24,
  },
  otpInputHighlight: {
    borderColor: theme.colors.purple,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
