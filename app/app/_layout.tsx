import { Drawer } from "./drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          title: "",
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
    </Drawer>
  );
}
