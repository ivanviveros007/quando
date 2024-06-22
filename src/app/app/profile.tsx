import { View, Text } from "react-native";
import { useAuthStore } from "@/src/store/useAuthStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {
  const { user, logout } = useAuthStore();

  const data = [
    {
      id: 1,
      title: "Nombre de usuario",
      icon: <MaterialIcons name="person" size={24} color="black" />,
    },
    {
      id: 2,
      title: "Correo electrónico",
      icon: <MaterialIcons name="email" size={24} color="black" />,
    },
    {
      id: 3,
      title: "Teléfono",
      icon: <MaterialIcons name="phone" size={24} color="black" />,
    },
    {
      id: 4,
      title: "Dirección",
      icon: <MaterialIcons name="location-on" size={24} color="black" />,
    },
  ];

  const logOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: "center" }}>
        <View
          style={{
            backgroundColor: "grey",
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
        />
      </View>
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Nombre de usuario
      </Text>
      <Text style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
        10 eventos creados
      </Text>

      <View style={{ flex: 1, marginTop: 50 }}>
        {data.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", padding: 10 }}>
            {item.icon}
            <Text style={{ marginLeft: 10 }}>{item.title}</Text>
          </View>
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 100 }}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <MaterialIcons
            name="logout"
            size={24}
            color="black"
            onPress={logOut}
          />
          <Text style={{ marginLeft: 10 }}>Cerrar sesión</Text>
        </View>
      </View>
    </View>
  );
}
