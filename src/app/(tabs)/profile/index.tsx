import React, { useEffect } from "react";
import {
  View,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ThemedText as Text } from "@/src/components/ThemedText";
import { useAuthStore } from "@/src/store/authStore";
import { useUserStore } from "@/src/store/userStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { globalStyles } from "@/src/theme";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { additionalInfo, fetchAdditionalInfo, uploadProfilePicture, loading } =
    useUserStore();

  useEffect(() => {
    fetchAdditionalInfo();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permiso requerido",
        "Se requiere permiso para acceder a la galería."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      if (selectedImage.uri) {
        try {
          await uploadProfilePicture(selectedImage.uri);
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else {
        Alert.alert(
          "Error",
          "No se pudo obtener la URI de la imagen seleccionada."
        );
      }
    }
  };

  const logOut = async () => {
    try {
      await Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro de que deseas cerrar sesión?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Cerrar sesión",
            onPress: async () => {
              await logout();
              router.push("/");
            },
          },
        ]
      );
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const data = [
    {
      id: 2,
      title: ` ${user?.email}`,
      icon: <MaterialIcons name="email" size={24} color="black" />,
    },
    {
      id: 3,
      title: ` ${user?.phoneNumber}`,
      icon: <MaterialIcons name="phone" size={24} color="black" />,
    },
    {
      id: 4,
      title: "Dirección",
      icon: <MaterialIcons name="location-on" size={24} color="black" />,
    },
    {
      id: 5,
      title: "Cerrar sesión",
      icon: (
        <MaterialIcons name="logout" size={24} color="black" onPress={logOut} />
      ),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.flex}>
      <Pressable onPress={pickImage} style={globalStyles.containerTitle}>
        <View style={styles.emptyImage}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : additionalInfo.photoURL ? (
            <Image
              source={{ uri: additionalInfo.photoURL }}
              style={styles.image}
            />
          ) : (
            <MaterialIcons name="camera-alt" size={24} color="white" />
          )}
        </View>
      </Pressable>
      <Text style={styles.name} type="subtitle">
        {user?.displayName}
      </Text>
      <Text style={styles.events} type="link">
        10 eventos creados
      </Text>

      <View style={styles.containerData}>
        {data.map((item) => (
          <View key={item.id} style={styles.containerItems}>
            {item.icon}
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyImage: {
    backgroundColor: "grey",
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  name: {
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  events: {
    textAlign: "center",
    marginTop: verticalScale(10),
    fontSize: moderateScale(14),
  },
  containerData: {
    flex: 1,
    marginTop: verticalScale(50),
  },
  containerItems: {
    flexDirection: "row",
    padding: moderateScale(10),
    alignItems: "center",
    gap: moderateScale(10),
  },
  });
