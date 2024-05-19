import { useState } from "react";
import { View, Text } from "react-native";

import { EmptyStatePlan } from "@/components/emptyState";

export default function CreateEventsScreen() {
  const [plan, setPlan] = useState(false);
  return (
    <>
      {!plan ? (
        <EmptyStatePlan />
      ) : (
        <View>
          <Text>Plan</Text>
        </View>
      )}
    </>
  );
}
