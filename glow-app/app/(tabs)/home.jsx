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
          {
            id: 1,
            username: "carmon",
            textContent: "Woke up feeling fresh today and decided to take the opportunity of the natural light in my room to take this picture. These are my season's favourites.",
            avatar:
              "https://i.pinimg.com/564x/a7/9d/d6/a79dd6df283055cbac7bf4c58e336acd.jpg",
            postPhoto: "https://i.pinimg.com/736x/f2/e7/51/f2e751387dd8dbc19602696d4da1d67c.jpg",
            createdAt: "date",
          },
          { id: 2, textContent: "Post 2" },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            username={item.username}
            textContent={item.textContent}
            avatar={item.avatar}
            postPhoto={item.postPhoto}
            createdAt={item.createdAt}
          />
        )}
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
