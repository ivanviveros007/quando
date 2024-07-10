import React, { useEffect } from "react";
import {
  View,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText as Text } from "@/src/components/ThemedText";
import { useAuthStore } from "@/src/store/authStore";
import { useUserStore } from "@/src/store/userStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { globalStyles } from "@/src/theme";
import { moderateScale, verticalScale } from "@/src/helpers";
import { usePlansStore } from "@/src/store/planStore";
import { Images } from "@/src/constants/Images";

import { Background } from "@/src/components/container";
import { Colors } from "@/src/constants";

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { additionalInfo, fetchAdditionalInfo, uploadProfilePicture, loading } =
    useUserStore();

  const { plans } = usePlansStore();

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
      icon: (
        <MaterialIcons
          name="email"
          size={moderateScale(24)}
          color={Colors.primary_black}
        />
      ),
    },
    {
      id: 3,
      title: ` ${user?.phoneNumber}`,
      icon: (
        <MaterialIcons
          name="phone"
          size={moderateScale(24)}
          color={Colors.primary_black}
        />
      ),
    },
    {
      id: 4,
      title: "Dirección",
      icon: (
        <MaterialIcons
          name="location-on"
          size={moderateScale(24)}
          color={Colors.primary_black}
        />
      ),
    },
    {
      id: 5,
      title: "Cerrar sesión",
      icon: (
        <MaterialIcons
          name="logout"
          size={moderateScale(24)}
          color={Colors.primary_black}
          onPress={logOut}
        />
      ),
    },
  ];

  const renderItem = (item: {
    id: React.Key | null | undefined;
    icon:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined;
    title:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined;
  }) => {
    if (item.id === Math.max(...data.map((d) => d.id))) {
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.containerItems, { marginTop: verticalScale(80) }]}
          onPress={logOut}
        >
          {item.icon}
          <Text>{item.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View key={item.id} style={styles.containerItems}>
          {item.icon}
          <Text>{item.title}</Text>
        </View>
      );
    }
  };

  return (
    <Background>
      <Images.General.LogoWhite
        style={styles.logo}
        height={moderateScale(40)}
        width={moderateScale(100)}
      />
      <View style={styles.container}>
        <Pressable
          onPress={pickImage}
          style={[globalStyles.containerTitle, styles.positionImage]}
        >
          <View style={styles.emptyImage}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : additionalInfo.photoURL ? (
              <Image
                source={{ uri: additionalInfo.photoURL }}
                style={styles.image}
              />
            ) : (
              <MaterialIcons
                name="camera-alt"
                size={moderateScale(24)}
                color="white"
              />
            )}
          </View>
        </Pressable>
        <Text style={styles.name} type="subtitle">
          {user?.displayName}
        </Text>
        <View style={styles.containerPlans}>
          <MaterialIcons
            name="calendar-month"
            size={moderateScale(18)}
            color="black"
          />
          <Text style={styles.events}>{plans?.length} eventos creados</Text>
        </View>

        <View style={styles.containerData}>{data.map(renderItem)}</View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    top: verticalScale(60),
  },
  container: {
    height: "80%",
    width: "100%",
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
    bottom: 0,
    position: "absolute",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  positionImage: {
    bottom: verticalScale(50),
  },
  emptyImage: {
    backgroundColor: "grey",
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  containerPlans: {
    flexDirection: "row",
    gap: 5,
    alignSelf: "center",
    top: 10,
  },
  events: {
    textAlign: "center",
    fontSize: moderateScale(14),
  },
  containerData: {
    flex: 1,
    marginTop: verticalScale(50),
    paddingHorizontal: moderateScale(20),
  },
  containerItems: {
    flexDirection: "row",
    padding: moderateScale(10),
    alignItems: "center",
    gap: moderateScale(10),
  },
});
