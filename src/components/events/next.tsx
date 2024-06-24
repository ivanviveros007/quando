import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { FlatList } from "react-native";
import { EmptyStatePlan } from "../emptyState";

export const NextEvent = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <EmptyStatePlan />}
        contentContainerStyle={{}}
        ListEmptyComponent={<EmptyStatePlan />}
      />
    </ThemedView>
  );
};
