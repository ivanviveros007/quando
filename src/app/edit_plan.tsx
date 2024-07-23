import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
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

import { useLocalSearchParams } from "expo-router";

import { verticalScale, horizontalScale } from "@/src/helpers";

interface Contact {
  id: string;
  name: string;
  contactType?: string;
  firstName?: string;
  lastName?: string;
  phoneNumbers?: { number: string }[];
  imageAvailable?: boolean;
}

interface Plan {
  id?: string;
  planType: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  guests: Contact[];
  imageUri?: string;
}

const initialPlanValues: Omit<Plan, "id"> = {
  planType: "",
  title: "",
  date: new Date().toISOString().split("T")[0], // Fecha actual
  time: format(new Date(), "HH:mm"), // Hora actual
  location: "",
  description: "",
  guests: [],
  imageUri: "",
};

const EditPlan: React.FC = () => {
  const { edit, planId } = useLocalSearchParams();
  const plans = usePlansStore((state) => state.plans);
  const addPlan = usePlansStore((state) => state.addPlan);
  const updatePlan = usePlansStore((state) => state.updatePlan);
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const address = useLocationStore((state) => state.address);

  const [showDropDown, setShowDropDown] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] =
    useState<Omit<Plan, "id">>(initialPlanValues);

  useEffect(() => {
    if (edit && planId) {
      const planToEdit = plans.find((plan) => plan.id === planId);
      if (planToEdit) {
        setInitialValues({
          planType: planToEdit.planType,
          title: planToEdit.title,
          date: planToEdit.date || new Date().toISOString().split("T")[0],
          time: planToEdit.time || format(new Date(), "HH:mm"),
          location:
            planToEdit.location ||
            (selectedLocation
              ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
              : ""),
          description: planToEdit.description,
          guests: planToEdit.guests || [],
          imageUri: planToEdit.imageUri || "",
        });
        setImageUris(planToEdit.imageUri ? [planToEdit.imageUri] : []);
        setDate(new Date(planToEdit.date));
        setTime(new Date(`1970-01-01T${planToEdit.time}:00`));
      }
    }
  }, [edit, planId, plans, selectedLocation]);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setInitialValues({
      ...initialValues,
      date: currentDate.toISOString().split("T")[0],
    });
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setInitialValues({ ...initialValues, time: format(currentTime, "HH:mm") });
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

  const navigateToConfirmation = async (planName: string) => {
    const queryParam = { planName };
    await router.push({
      pathname: "confirmation",
      params: queryParam,
    });
    setLoading(false);
  };

  const handleSubmitForm = async (
    values: Omit<Plan, "id">,
    resetForm: () => void,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setLoading(true);
    if (imageUris.length > 0) {
      setFieldValue("imageUri", imageUris[0]);
    }

    const planData = {
      ...values,
      imageUri: imageUris[0],
    };

    try {
      if (edit) {
        await updatePlan(planId, planData);
      } else {
        await addPlan(planData);
      }
      await navigateToConfirmation(values.title);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.backgroundSafeArea]}>
      {loading && <LoadingScreen />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setFieldValue, resetForm }) =>
          handleSubmitForm(values, resetForm, setFieldValue)
        }
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
                {edit ? "Editar plan" : "Crea tu plan"}
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
                title={edit ? "Actualizar" : "Enviar invitaciones"}
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

export default EditPlan;

const styles = StyleSheet.create({
  backgroundSafeArea: {
    backgroundColor: "#FDF9FC",
  },
  title: {
    textAlign: "center",
    marginBottom: verticalScale(30),
    fontFamily: "RobotoBold",
  },
  dropAndTitle: {
    flexDirection: "column",
    gap: moderateScale(20),
  },
  positionArrow: {
    position: "absolute",
    right: horizontalScale(10),
    top: verticalScale(20),
  },
  container: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(106),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: "#FDF9FC",
  },
  containerDateTime: {
    flexDirection: "row",
    gap: moderateScale(20),
    marginBottom: verticalScale(10),
  },
  date: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(50),
    alignItems: "center",
    borderWidth: moderateScale(0.5),
    borderColor: Colors.primary_pruple,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(5),
    backgroundColor: "white",
  },
  errorsDate: {
    flexDirection: "row",
    gap: moderateScale(55),
  },
  label: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  input: {
    marginBottom: verticalScale(16),
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderColor: "#ddd",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    justifyContent: "center",
  },
  datePicker: {
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: verticalScale(5),
  },
  imageCount: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(16),
    color: "grey",
  },
  descriptionInput: {
    height: verticalScale(100),
  },
  selectedContacts: {
    marginTop: verticalScale(10),
  },
  outlineStyle: {
    borderWidth: 1,
    borderColor: Colors.primary_pruple,
  },
});
