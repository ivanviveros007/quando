import React, { useState, useRef } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Menu } from "react-native-paper";
import { Formik } from "formik";
import { validationSchema } from "@/src/schemas/registerSchema";
import { formFields } from "./formData";
import { styles } from "./styles";
import { FormValues } from "./types";
import { globalStyles } from "@/src/theme";
import { ThemedText as Text } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { useAuthStore } from "@/src/store/useAuthStore";
import { themeTextInput } from "@/src/theme/themeInput";

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  areaCode: "+54",
};

const Register = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const {
    setPhoneNumber,
    setAreaCode,
    setName,
    setEmail,
    registerUser,
    loading,
    areaCode,
    phoneNumber,
  } = useAuthStore();

  const refs = useRef<any[]>([]);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleRegister = async (values: any) => {
    if (!isValidPhoneNumber(values.phoneNumber)) {
      Alert.alert(
        "Número Inválido",
        "Por favor, ingresa un número de teléfono válido"
      );
      return;
    }

    const result = await registerUser();
    if (result.status === "SUCCESS") {
      router.push("home");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleRegister(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            {formFields.map((field, index) => {
              if (field.type === "menu") {
                return (
                  <View key={index} style={styles.row}>
                    <Menu
                      visible={menuVisible}
                      onDismiss={closeMenu}
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={openMenu}
                          style={styles.areaButton}
                          textColor="black"
                        >
                          {values.areaCode}
                        </Button>
                      }
                    >
                      <Menu.Item
                        onPress={() => {
                          setFieldValue("areaCode", "+54");
                          setAreaCode("+54");
                          closeMenu();
                        }}
                        title="+54 Argentina"
                        titleStyle={{
                          fontFamily: "RobotoBold",
                        }}
                        style={styles.menuItem}
                      />
                      <Menu.Item
                        onPress={() => {
                          setFieldValue("areaCode", "+34");
                          setAreaCode("+34");
                          closeMenu();
                        }}
                        title="+34 España"
                        titleStyle={{
                          fontFamily: "RobotoBold",
                        }}
                        style={styles.menuItem}
                      />
                    </Menu>
                    <TextInput
                      ref={(ref) => (refs.current[index] = ref)}
                      style={[styles.input, globalStyles.flex]}
                      mode="outlined"
                      focusable={true}
                      value={values.phoneNumber}
                      label={"Teléfono móvil"}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                        handleChange("phoneNumber")(text);
                      }}
                      placeholder={"Número de móvil"}
                      onBlur={handleBlur("phoneNumber")}
                      keyboardType={"phone-pad"}
                      maxLength={10}
                      error={!!(touched.phoneNumber && errors.phoneNumber)}
                      theme={themeTextInput}
                      outlineStyle={styles.outlineStyle}
                      onSubmitEditing={() => {
                        if (index < formFields.length - 1) {
                          refs.current[index + 1].focus();
                        }
                      }}
                      onKeyPress={({ nativeEvent }) => {
                        if (
                          nativeEvent.key === "Backspace" &&
                          values.phoneNumber === "" &&
                          index > 0
                        ) {
                          refs.current[index - 1]?.focus();
                        }
                      }}
                    />
                    <View style={styles.containerError}>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <Text style={styles.errorText}>
                          {[errors.phoneNumber]}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              }
              if (field.type === "phone") {
                // No renderizar aquí el input del teléfono
                return null;
              }

              return (
                <View key={index} style={styles.inputContainer}>
                  <TextInput
                    ref={(ref) => (refs.current[index] = ref)}
                    label={field.label}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    mode="outlined"
                    keyboardType={field.keyboardType}
                    error={
                      !!(
                        touched[field.name as keyof FormValues] &&
                        errors[field.name as keyof FormValues]
                      )
                    }
                    style={styles.input}
                    theme={themeTextInput}
                    outlineStyle={styles.outlineStyle}
                    onSubmitEditing={() => {
                      if (index < formFields.length - 1) {
                        refs.current[index + 1].focus();
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === "Backspace" &&
                        values[field.name as keyof FormValues] === "" &&
                        index > 0
                      ) {
                        refs.current[index - 1]?.focus();
                      }
                    }}
                  />
                  <View style={styles.containerError}>
                    {touched[field.name] && errors[field.name] && (
                      <Text style={styles.errorText}>{errors[field.name]}</Text>
                    )}
                  </View>
                </View>
              );
            })}
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
              labelStyle={styles.labelStyle}
            >
              Registrarse
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
