import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nothing here!"
            subtitle="Start following people to get started."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
