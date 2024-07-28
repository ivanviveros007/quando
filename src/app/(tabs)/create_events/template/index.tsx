import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
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

import { LoadingScreen } from "@/src/components/loading";
import { format } from "date-fns";

import { styles } from "./styles";
import * as Sentry from "@sentry/react-native";
import { IS_ANDROID } from "@/src/constants/Global";

const CreatePlan: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dateRef = useRef(date);
  const timeRef = useRef(time);

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const address = useLocationStore((state) => state.address);
  const addPlan = usePlansStore((state) => state.addPlan);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    try {
      const currentDate = selectedDate || date;
      currentDate.setHours(0, 0, 0, 0);
      setDate(currentDate);
      setShowDatePicker(false);
    } catch (error) {
      console.error("[handleDateChange] ", error);
      Sentry.captureException({
        message: "Error al cambiar la fecha",
        error,
      });
    }
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    try {
      const currentTime = selectedTime || time;
      setTime(currentTime);
      setShowTimePicker(false); // Ocultar el selector de tiempo después de la selección
    } catch (error) {
      console.error("[handleTimeChange] ", error);
      Sentry.captureException({
        message: "Error al cambiar la hora",
        error,
      });
    }
  };

  const handleLocationPress = () => {
    router.push("(tabs)/create_events/map");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (result.granted === false) {
        alert("Permiso para acceder a la galería es requerido!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false, // Asegura que solo se pueda seleccionar una imagen
      });

      if (
        !pickerResult.canceled &&
        pickerResult.assets &&
        pickerResult.assets.length === 1 // Verifica que solo se haya seleccionado una imagen
      ) {
        setImageUris([pickerResult.assets[0].uri]);
      } else {
        alert("Por favor, selecciona una única imagen.");
      }
    } catch (error) {
      console.error("[selectImage] ", error);
      Sentry.captureException({
        message: "Error al seleccionar una imagen",
        error,
      });
      alert(
        "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo."
      );
    }
  };

  const navigateToConfirmation = async (planName) => {
    try {
      const queryParam = { planName };
      await router.push({
        pathname: "confirmation",
        params: queryParam,
      });
      setLoading(false);
    } catch (error) {
      console.error("[navigateToConfirmation] ", error);
      setLoading(false);
      Sentry.captureException({
        message: "Error al navegar a la confirmación",
        error,
      });
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.backgroundSafeArea]}>
      {loading && <LoadingScreen />}

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
          imageUris: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldValue, resetForm }) => {
          setLoading(true);
          if (imageUris.length > 0) {
            setFieldValue("imageUri", imageUris[0]);
          }

          const planData = {
            ...values,
            imageUri: imageUris[0],
          };
          // console.log("values form planData", planData);

          try {
            await addPlan(planData);
            await navigateToConfirmation(values.title);
            resetForm();
          } catch (error) {
            console.error("Error submitting form:", error);
            Sentry.captureException({
              message: "Error al enviar el formulario",
              error,
            });
          } finally {
            setLoading(false);
          }
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
            <ScrollView
              contentContainerStyle={styles.container}
              automaticallyAdjustKeyboardInsets
            >
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
                  {IS_ANDROID ? (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        paddingHorizontal: 10,
                      }}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <ThemedText style={styles.dateText}>
                        {format(date, "MM-dd-yyyy")}
                      </ThemedText>
                      <MaterialIcons
                        name="date-range"
                        size={moderateScale(24)}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : (
                    <>
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
                        accentColor={Colors.primary_light_blue}
                      />
                      <MaterialIcons
                        name="date-range"
                        size={moderateScale(24)}
                        color="black"
                      />
                    </>
                  )}
                  {showDatePicker && IS_ANDROID && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={(event, selectedDate) => {
                        handleDateChange(event, selectedDate);
                        if (selectedDate && selectedDate !== dateRef.current) {
                          dateRef.current = selectedDate;
                          setFieldValue(
                            "date",
                            selectedDate.toISOString().split("T")[0]
                          );
                        }
                      }}
                      accentColor={Colors.primary_light_blue}
                    />
                  )}
                </View>

                <View style={[styles.date, { width: "45%" }]}>
                  {IS_ANDROID ? (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        paddingHorizontal: 10,
                      }}
                      onPress={() => setShowTimePicker(true)}
                    >
                      <ThemedText style={styles.dateText}>
                        {format(time, "HH:mm")}
                      </ThemedText>
                      <MaterialIcons
                        name="access-time"
                        size={moderateScale(24)}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                          handleTimeChange(event, selectedTime);
                          setFieldValue(
                            "time",
                            selectedTime ? format(selectedTime, "HH:mm") : time
                          );
                        }}
                        accentColor={Colors.primary_light_blue}
                      />
                      <MaterialIcons
                        name="access-time"
                        size={moderateScale(24)}
                        color="black"
                      />
                    </>
                  )}

                  {showTimePicker && IS_ANDROID && (
                    <DateTimePicker
                      value={time}
                      mode="time"
                      display="default"
                      onChange={(event, selectedTime) => {
                        handleTimeChange(event, selectedTime);
                        if (selectedTime && selectedTime !== timeRef.current) {
                          timeRef.current = selectedTime;
                          setFieldValue("time", format(selectedTime, "HH:mm"));
                        }
                      }}
                      accentColor={Colors.primary_light_blue}
                    />
                  )}
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
                disabled={loading}
              />
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default CreatePlan;
