import { useState } from "react";
import { View, Text } from "react-native";

import { EmptyStatePlan } from "@/src/components/emptyState";
import TabRouter from "@/src/components/TabRouter";
import { TodayEvent } from "@/src/components/events/today";
import { NextEvent } from "@/src/components/events/next";
import { SceneMap } from "react-native-tab-view";

export default function CreateEventsScreen() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "today", title: "Hoy" },
    { key: "next", title: "Próximos" },
  ];

  const renderScene = SceneMap({
    today: TodayEvent,
    next: NextEvent,
  });

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TabRouter
          routes={routes}
          renderScene={renderScene}
          index={index}
          setIndex={setIndex}
        />
      </View>
    </>
  );
}
