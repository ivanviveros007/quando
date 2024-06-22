import { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Menu } from "react-native-paper";
import { Formik } from "formik";
import { validationSchema } from "@/src/schemas/registerSchema";
import { formFields } from "./formData";
import { styles } from "./styles";
import { FormValues } from "./types";
import { theme, globalStyles } from "@/src/theme";
import { ThemedText as Text } from "@/src/components/ThemedText";

import { router } from "expo-router";
import { useAuthStore } from "@/src/store/useAuthStore";

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

 

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleRegister = async (values: any) => {
    if (!isValidPhoneNumber(phoneNumber)) {
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

  const themeTextInput = {
    colors: {
      primary: theme.colors.black,
      placeholder: theme.colors.placeholder,
      background: theme.colors.white,
    },
    roundness: 10,
    fonts: {
      regular: {
        fontFamily: theme.fonts.regular.fontFamily,
        fontWeight: theme.fonts.regular.fontWeight,
      },
    },
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
        }) => (
          <View>
            {formFields.map((field, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
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
                  outlineStyle={{ borderWidth: 1 }}
                />
                {touched[field.name] && errors[field.name] && (
                  <Text style={styles.errorText}>{errors[field.name]}</Text>
                )}
              </View>
            ))}
            <View style={styles.row}>
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
                    {areaCode}
                  </Button>
                }
                theme={{
                  colors: {
                    primary: "blue",
                  },
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
                  style={{ backgroundColor: "white" }}
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
                  style={{ backgroundColor: "white" }}
                />
              </Menu>
              <TextInput
                style={[styles.input, globalStyles.flex]}
                mode="outlined"
                focusable={true}
                value={phoneNumber}
                label={"Teléfono móvil"}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder={"Número de móvil"}
                autoFocus={true}
                onSubmitEditing={() => console.log("Register Process")}
                keyboardType={"phone-pad"}
                maxLength={10}
                error={!isValidPhoneNumber(phoneNumber) && !!phoneNumber.length}
                theme={themeTextInput}
                outlineStyle={{ borderWidth: 1 }}
              />
            </View>
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
