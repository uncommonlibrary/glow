import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import PostCard from "../../components/PostCard";

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
        data={[
          { id: 1, caption: "Post 1" },
          { id: 2, caption: "Post 2" },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard caption={item.caption} />}
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
