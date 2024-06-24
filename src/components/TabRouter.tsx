import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view";

import { theme } from "@/src/theme";
import { ThemedText as Text } from "./ThemedText";

interface Route {
  key: string;
  title: string;
}

interface Props {
  routes: Route[];
  renderScene: (
    props: SceneRendererProps & { route: Route }
  ) => React.ReactElement;
  index: number;
  setIndex: (index: number) => void;
}

const TabRouter: React.FC<Props> = ({
  routes,
  renderScene,
  index,
  setIndex,
}) => {
  const layout = useWindowDimensions();
  const [activeTab, setActiveTab] = useState(routes[index].key);

  const handleIndexChange = (newIndex: number) => {
    setActiveTab(routes[newIndex].key);
    setIndex(newIndex);
  };

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={[styles.indicatorStyle]}
            activeColor="black"
            inactiveColor="black"
            renderLabel={({ route, color }) => (
              <Text style={[styles.labelStyle, { color }]} type="default">
                {route.title}
              </Text>
            )}
            pressColor="transparent"
            style={styles.tab}
            
          />
        )}
      />
    </>
  );
};

export default TabRouter;

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: theme.colors.light_blue,
    // height: "100%",
  },
  labelStyle: {
    bottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },

  tab: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 4,
    height: "4.5%",
  },
});
