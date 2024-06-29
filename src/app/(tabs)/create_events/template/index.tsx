import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Formik } from "formik";

import DropDown from "react-native-paper-dropdown";
import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocationStore } from "@/src/store/locationStore";
import InviteContacts from "@/src/components/contacts";
import { Button } from "@/src/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { planTypes } from "@/src/constants/Global";
import { validationSchema } from "@/src/schemas/createEventSchema";
import { themeTextInput } from "@/src/theme/themeInput";
import { globalStyles } from "@/src/theme";
import { moderateScale } from "@/src/helpers";

import { styles } from "./styles";

const CreatePlan: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const theme = useTheme();

  const selectedLocation = useLocationStore((state) => state.selectedLocation);

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
    <SafeAreaView style={globalStyles.container}>
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
          guests: [],
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
              <ThemedText type="title" style={styles.title}>
                Crea tu plan
              </ThemedText>

              <View style={styles.dropAndTitle}>
                <View>
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
                    size={moderateScale(24)}
                    color="black"
                    style={styles.positionArrow}
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

              <View style={styles.containerDateTime}>
                <View style={styles.date}>
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
                  <MaterialIcons
                    name="date-range"
                    size={moderateScale(24)}
                    color="black"
                  />
                </View>

                <View style={[styles.date, { width: "45%" }]}>
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
                  <MaterialIcons
                    name="access-time"
                    size={moderateScale(24)}
                    color="black"
                  />
                </View>
              </View>
              <View style={styles.errorsDate}>
                {touched.date && errors.date && (
                  <Text style={styles.error}>{errors.date}</Text>
                )}
                {touched.time && errors.time && (
                  <Text style={styles.error}>{errors.time}</Text>
                )}
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

              <InviteContacts setFieldValue={setFieldValue} />

              {touched.guests && errors.guests && (
                <Text style={[styles.error]}>{errors.guests}</Text>
              )}

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

              <PaperTextInput
                style={[styles.input, styles.descriptionInput]}
                mode="outlined"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
                label="Descripción"
                theme={themeTextInput}
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

export default CreatePlan;
