import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
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

const CreatePlan: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [loading, setLoaing] = useState(false);

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
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      setImageUris([pickerResult.assets[0].uri]);
    }
  };

  const navigateToConfirmation = async (planName) => {
    const queryParam = { planName };
    await router.push({
      pathname: "confirmation",
      params: queryParam,
    });
    setLoaing(false);
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
          setLoaing(true); // Asegúrate de que setLoaing esté definido y manejado correctamente
          if (imageUris.length > 0) {
            setFieldValue("imageUri", imageUris[0]);
          }

          const planData = {
            ...values,
            imageUri: imageUris[0],
          };
          console.log("values form planData", planData);

          try {
            await addPlan(planData);
            await navigateToConfirmation(values.title); // Asegúrate de que navigateToConfirmation esté definido y manejado correctamente
            resetForm();
          } catch (error) {
            console.error("Error submitting form:", error);
          } finally {
            setLoaing(false);
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
