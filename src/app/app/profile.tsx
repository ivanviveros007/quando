import { View, Pressable } from "react-native";
import { ThemedText as Text } from "@/src/components/ThemedText";
import { useAuthStore } from "@/src/store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {
  const { user, logout } = useAuthStore();

  console.log("user desde profile", user);

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
      <Text style={{ textAlign: "center", marginTop: 20 }} type="subtitle">
        {user?.displayName}
      </Text>
      <Text style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
        10 eventos creados
      </Text>

      <View style={{ flex: 1, marginTop: 50 }}>
        {data.map((item) => (
          <View
            key={item.id}
            style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
          >
            {item.icon}
            <Text style={{ marginLeft: 10 }}>{item.title}</Text>
          </View>
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 100 }}>
        <Pressable
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
          onPress={logOut}
        >
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}
