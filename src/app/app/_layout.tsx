import { Drawer } from "./drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Profile from "./profile";

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <Profile />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          title: "",
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
