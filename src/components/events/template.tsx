import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDown from "react-native-paper-dropdown";
import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const validationSchema = Yup.object().shape({
  planType: Yup.string().required("El tipo de plan es obligatorio"),
  title: Yup.string().required("El título es obligatorio"),
  date: Yup.string().required("La fecha es obligatoria"),
  time: Yup.string().required("La hora es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  description: Yup.string(),
});

const CrearPlan = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const theme = useTheme();

  const planTypes = [
    { label: "Deporte", value: "deporte" },
    { label: "Reunión", value: "reunion" },
    { label: "Fiesta", value: "fiesta" },
    { label: "Otros", value: "otros" },
  ];

  const selectImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permiso para acceder a la galería es requerido!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUri(pickerResult.uri);
    }
  };

  return (
    <Formik
      initialValues={{
        planType: "",
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      }}
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
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Tipo de plan *</Text>
          <DropDown
            label={"Tipo de plan"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={values.planType}
            setValue={handleChange("planType")}
            list={planTypes}
            theme={theme}
          />
          {touched.planType && errors.planType && (
            <Text style={styles.error}>{errors.planType}</Text>
          )}

          <Text style={styles.label}>Título *</Text>
          <PaperTextInput
            style={styles.input}
            mode="outlined"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
          />
          {touched.title && errors.title && (
            <Text style={styles.error}>{errors.title}</Text>
          )}

          <Text style={styles.label}>Fecha *</Text>
          <PaperTextInput
            style={styles.input}
            mode="outlined"
            onChangeText={handleChange("date")}
            onBlur={handleBlur("date")}
            value={values.date}
          />
          {touched.date && errors.date && (
            <Text style={styles.error}>{errors.date}</Text>
          )}

          <Text style={styles.label}>Hora *</Text>
          <PaperTextInput
            style={styles.input}
            mode="outlined"
            onChangeText={handleChange("time")}
            onBlur={handleBlur("time")}
            value={values.time}
          />
          {touched.time && errors.time && (
            <Text style={styles.error}>{errors.time}</Text>
          )}

          <Text style={styles.label}>¿Dónde? *</Text>
          <PaperTextInput
            style={styles.input}
            mode="outlined"
            onChangeText={handleChange("location")}
            onBlur={handleBlur("location")}
            value={values.location}
          />
          {touched.location && errors.location && (
            <Text style={styles.error}>{errors.location}</Text>
          )}

          <Text style={styles.label}>Agregar imagen</Text>
          <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Text style={styles.imagePlaceholder}>Seleccionar imagen</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Descripción</Text>
          <PaperTextInput
            style={[styles.input, styles.descriptionInput]}
            mode="outlined"
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            multiline
          />
          {touched.description && errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          <Button onPress={handleSubmit} title="Enviar invitaciones" />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  imagePlaceholder: {
    color: "#ccc",
  },
  descriptionInput: {
    height: 100,
  },
});

export default CrearPlan;
