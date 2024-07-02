import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Formik } from "formik";

import DropDown from "react-native-paper-dropdown";
import { TextInput as PaperTextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocationStore } from "@/src/store/locationStore";
import InviteContacts from "@/src/components/contactsButton";
import { Button } from "@/src/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { planTypes } from "@/src/constants/Global";
import { validationSchema } from "@/src/schemas/createEventSchema";
import { globalStyles } from "@/src/theme";
import { moderateScale } from "@/src/helpers";
import { themeTemplate } from "@/src/theme/themeTemplate";
import { Colors } from "@/src/constants";
import { geocodeCoordinates } from "@/src/services";
import { usePlansStore } from "@/src/store/planStore";

import { styles } from "./styles";

const CreatePlan: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const address = useLocationStore((state) => state.address);
  const addPlan = usePlansStore((state) => state.addPlan);

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
    <SafeAreaView style={[globalStyles.container, styles.backgroundSafeArea]}>
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
        onSubmit={async (values) => {
          console.log("values form", values);
          // Aquí puedes manejar el envío del formulario
          await addPlan(values);
          router.push("(tabs)/create_events/confirmation", {
            planName: values.title,
            planType: values.planType,
            date: values.date,
            time: values.time,
            location: values.location,
            description: values.description,
            guests: values.guests,
            imageUris: imageUris,
          });
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
            const fetchGeocode = async () => {
              if (selectedLocation) {
                const address = await geocodeCoordinates(
                  selectedLocation.latitude,
                  selectedLocation.longitude
                );
                setFieldValue("location", address);
              }
            };

            fetchGeocode();
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
                    theme={themeTemplate}
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

                <View style={{ bottom: 15 }}>
                  {touched.planType && errors.planType && (
                    <ThemedText style={styles.error}>
                      {errors.planType}
                    </ThemedText>
                  )}
                </View>

                <PaperTextInput
                  style={styles.input}
                  mode="outlined"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  label="Título *"
                  placeholder="Título *"
                  theme={themeTemplate}
                  activeOutlineColor={Colors.primary_black}
                  outlineColor={Colors.primary_pruple}
                  outlineStyle={styles.outlineStyle}
                />

                <View style={{ bottom: 30 }}>
                  {touched.title && errors.title && (
                    <ThemedText style={styles.error}>{errors.title}</ThemedText>
                  )}
                </View>
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
                  <ThemedText style={styles.error}>{errors.date}</ThemedText>
                )}
                {touched.time && errors.time && (
                  <ThemedText style={styles.error}>{errors.time}</ThemedText>
                )}
              </View>

              <PaperTextInput
                style={[styles.input, { height: 50 }]}
                mode="outlined"
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={address ? address : values.location}
                label="¿Dónde? *"
                placeholder="¿Dónde?"
                right={
                  <PaperTextInput.Icon
                    icon="map-marker"
                    onPress={handleLocationPress}
                  />
                }
                theme={themeTemplate}
                activeOutlineColor={Colors.primary_black}
                outlineColor={Colors.primary_pruple}
                outlineStyle={styles.outlineStyle}
              />
              {touched.location && errors.location && (
                <ThemedText style={styles.error}>{errors.location}</ThemedText>
              )}

              <InviteContacts setFieldValue={setFieldValue} />

              {touched.guests && errors.guests && (
                <ThemedText style={[styles.error]}>{errors.guests}</ThemedText>
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
                theme={themeTemplate}
                activeOutlineColor={Colors.primary_black}
                outlineColor={Colors.primary_pruple}
                outlineStyle={styles.outlineStyle}
              />
              {imageUris.length > 0 && (
                <ThemedText style={styles.imageCount}>
                  {imageUris.length} imagen(es) adjunta(s)
                </ThemedText>
              )}

              <PaperTextInput
                style={[styles.input, styles.descriptionInput]}
                mode="outlined"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
                label="Descripción"
                theme={themeTemplate}
                activeOutlineColor={Colors.primary_black}
                outlineColor={Colors.primary_pruple}
                outlineStyle={styles.outlineStyle}
              />
              {touched.description && errors.description && (
                <ThemedText style={styles.error}>
                  {errors.description}
                </ThemedText>
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
