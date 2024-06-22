import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import { validationSchema } from "@/src/schemas/registerSchema";
import { formFields } from "./formData";
import { styles } from "./styles";
import { FormValues } from "./types";
import { theme } from "@/src/theme";
import { ThemedText as Text } from "@/src/components/ThemedText";

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const Register = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // Aquí puedes manejar el envío del formulario
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
                  theme={{
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
                  }}
                  outlineStyle={{ borderWidth: 1 }}
                />
                {touched[field.name] && errors[field.name] && (
                  <Text style={styles.errorText}>{errors[field.name]}</Text>
                )}
              </View>
            ))}
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
