import { FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { EmptyStatePlan } from "../emptyState";

export const TodayEvent = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <EmptyStatePlan />}
        contentContainerStyle={{}}
        ListEmptyComponent={<EmptyStatePlan type="today" />}
      />
    </ThemedView>
  );
};
