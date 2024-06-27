import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDown from "react-native-paper-dropdown";
import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";

import * as Contacts from "expo-contacts";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocationStore } from "@/src/store/locationStore";

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

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const theme = useTheme();

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore(
    (state) => state.setSelectedLocation
  );

  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const planTypes = [
    { label: "Comida", value: "food" },
    { label: "Cena", value: "dinner" },
    { label: "Fiesta", value: "fest" },
    { label: "Viaje", value: "travel" },
    { label: "Deporte", value: "sports" },
    { label: "Dia de juego", value: "game" },
    { label: "Cumpleaños", value: "birthday" },
    { label: "Plan cultural", value: "culture" },
    { label: "Cita", value: "date" },
    { label: "Otro", value: "other" },
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

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleLocationPress = () => {
    router.push("contacts");
  };

  const handleSelectContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso para acceder a contactos fue denegado");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      setContacts(data);
    }
  };

  const handleAddContact = (contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      setSelectedContacts([
        ...selectedContacts,
        { ...contact, selectedPhoneNumber: contact.phoneNumbers[0].number },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          planType: "",
          title: "",
          date: "",
          time: "",
          location: selectedLocation
            ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
            : "",
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
          setFieldValue,
        }) => {
          useEffect(() => {
            if (selectedLocation) {
              setFieldValue(
                "location",
                `${selectedLocation.latitude}, ${selectedLocation.longitude}`
              );
            }
          }, [selectedLocation]);

          return (
            <ScrollView contentContainerStyle={styles.container}>
              <ThemedText
                type="title"
                style={{ textAlign: "center", marginBottom: 30 }}
              >
                Crea tu plan
              </ThemedText>

              <View style={{ flexDirection: "column", gap: 20 }}>
                <DropDown
                  label={"Tipo de plan *"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={values.planType}
                  setValue={handleChange("planType")}
                  list={planTypes}
                  theme={theme}
                  placeholder="Tipo de plan *"
                />
                {touched.planType && errors.planType && (
                  <Text style={styles.error}>{errors.planType}</Text>
                )}

                <PaperTextInput
                  style={styles.input}
                  mode="outlined"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  label="Título *"
                  placeholder="Título *"
                />
                {touched.title && errors.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </View>

              <Text style={styles.label}>Fecha *</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ flex: 1, backgroundColor: "red" }}
              >
                <PaperTextInput
                  style={styles.input}
                  mode="outlined"
                  value={values.date}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                    setFieldValue(
                      "date",
                      selectedDate?.toISOString().split("T")[0]
                    );
                  }}
                />
              )}
              {touched.date && errors.date && (
                <Text style={styles.error}>{errors.date}</Text>
              )}

              <Text style={styles.label}>Hora *</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <PaperTextInput
                  style={styles.input}
                  mode="outlined"
                  value={values.time}
                  editable={false}
                />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    handleTimeChange(event, selectedTime);
                    setFieldValue(
                      "time",
                      selectedTime.toISOString().split("T")[1].substr(0, 5)
                    );
                  }}
                />
              )}
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
                label="Ubicación *"
                placeholder="Ubicación *"
                right={
                  <PaperTextInput.Icon
                    icon="map-marker"
                    onPress={handleLocationPress}
                  />
                }
              />
              {touched.location && errors.location && (
                <Text style={styles.error}>{errors.location}</Text>
              )}

              <Text style={styles.label}>Agregar imagen</Text>
              <TouchableOpacity
                onPress={selectImage}
                style={styles.imagePicker}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                  <Text style={styles.imagePlaceholder}>
                    Seleccionar imagen
                  </Text>
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

              <Text style={styles.label}>Invitados</Text>
              <Button
                title="Seleccionar Contactos"
                onPress={handleSelectContacts}
              />
              {contacts.length > 0 && (
                <FlatList
                  data={contacts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleAddContact(item)}>
                      <Text>
                        {item.name} ({item.phoneNumbers?.[0]?.number})
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
              {selectedContacts.length > 0 && (
                <View style={styles.selectedContacts}>
                  {selectedContacts.map((contact, index) => (
                    <Text key={index}>
                      {contact.name} ({contact.phoneNumbers?.[0]?.number})
                    </Text>
                  ))}
                </View>
              )}

              <Button onPress={handleSubmit} title="Enviar invitaciones" />
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 106,
    paddingHorizontal: 20,
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
  selectedContacts: {
    marginTop: 10,
  },
});

export default CrearPlan;
