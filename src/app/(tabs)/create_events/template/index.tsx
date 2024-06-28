import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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
import InviteContacts from "@/src/components/contacts";
import { Button } from "@/src/components/button";
import { MaterialIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  planType: Yup.string().required("El tipo de plan es obligatorio"),
  title: Yup.string().required("El título es obligatorio"),
  date: Yup.string().required("La fecha es obligatoria"),
  time: Yup.string().required("La hora es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  description: Yup.string(),
});

const CrearPlan: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const theme = useTheme();

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore(
    (state) => state.setSelectedLocation
  );

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>(
    []
  );

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

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleLocationPress = () => {
    router.push("(tabs)/create_events/map");
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

  const handleAddContact = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      setSelectedContacts([
        ...selectedContacts,
        { ...contact, selectedPhoneNumber: contact.phoneNumbers[0].number },
      ]);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permiso para acceder a la galería es requerido!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUris([...imageUris, pickerResult.uri]);
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

          useEffect(() => {
            if (selectedContacts.length > 0) {
              setFieldValue("guests", selectedContacts);
            }
          }, [selectedContacts]);

          return (
            <ScrollView contentContainerStyle={styles.container}>
              <ThemedText
                type="title"
                style={{ textAlign: "center", marginBottom: 30 }}
              >
                Crea tu plan
              </ThemedText>

              <View style={{ flexDirection: "column", gap: 20 }}>
                <View style={{}}>
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

                  <MaterialIcons
                    name={
                      showDropDown ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    }
                    size={24}
                    color="black"
                    style={{ position: "absolute", right: 10, top: 20 }}
                  />
                </View>

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

              <View style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}>
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    height: 50,
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "black",
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    backgroundColor: "white",
                  }}
                >
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
                  <MaterialIcons name="date-range" size={24} color="black" />

                  {touched.date && errors.date && (
                    <Text style={styles.error}>{errors.date}</Text>
                  )}
                </View>

                <View
                  style={{
                    width: "45%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 50,
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "black",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    backgroundColor: "white",
                  }}
                >
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      handleTimeChange(event, selectedTime);
                      setFieldValue(
                        "time",
                        selectedTime?.toISOString().split("T")[1].substr(0, 5)
                      );
                    }}
                  />
                  <MaterialIcons name="access-time" size={24} color="black" />
                  {touched.time && errors.time && (
                    <Text style={styles.error}>{errors.time}</Text>
                  )}
                </View>
              </View>

              <PaperTextInput
                style={styles.input}
                mode="outlined"
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
                label="¿Dónde? *"
                placeholder="¿Dónde?"
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

              <InviteContacts />

              <PaperTextInput
                style={styles.input}
                mode="outlined"
                label="Agregar imagen"
                placeholder="Agregar imagen"
                editable={false}
                right={
                  <PaperTextInput.Icon
                    icon="attachment"
                    onPress={selectImage}
                    style={{ transform: [{ rotate: "-45deg" }] }}
                  />
                }
              />
              {imageUris.length > 0 && (
                <Text style={styles.imageCount}>
                  {imageUris.length} imagen(es) adjunta(s)
                </Text>
              )}

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

              <Button
                onPress={handleSubmit}
                title="Enviar invitaciones"
                mode="contained"
              />
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
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  datePicker: {
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  imageCount: {
    fontSize: 14,
    marginBottom: 16,
    color: "grey",
  },
  descriptionInput: {
    height: 100,
  },
  selectedContacts: {
    marginTop: 10,
  },
});

export default CrearPlan;
