import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@/src/components/button";
import { theme } from "@/src/theme";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TextInput } from "react-native-paper";
import { ThemedText } from "@/src/components/ThemedText";

import { Colors } from "@/src/constants";

const CELL_COUNT = 6;

export default function Otp() {
  const [otp, setOtp] = useState("");
  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setCode, confirmCode, loading, areaCode, phoneNumber } =
    useAuthStore();

  useFocusEffect(
    useCallback(() => {
      if (otp.length === 0) {
        // Auto-focus on load is handled by the CodeField component
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
        <ThemedText style={styles.subtitle}>
          {`Te enviamos un SMS a \n ${areaCode} ${phoneNumber} con un \ncódigo de acceso. Ingrésalo abajo.`}
        </ThemedText>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={otp}
        onChangeText={setOtp}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cell}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
        InputComponent={TextInput}
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
  codeFieldRoot: {
    marginTop: 80,
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
    top: 50,
  },
  cellRoot: {
    width: 40,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#00000030",
  },
  cell: {
    fontSize: 24,
    textAlign: "center",
    paddingVertical: Platform.OS === "android" ? 0 : 10,
    color: Colors.purple_dark,
  },
  focusCell: {
    borderColor: "#000",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 80,
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
