import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import PostCard from "../../components/PostCard";
import { getFollowedPosts } from "../../services/userService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const followedPosts = await getFollowedPosts();
      setPosts(followedPosts);
    } catch (error) {
      console.error("Error in fetchPost effect", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchPosts();
    } catch (error) {
      console.error("Error refreshing posts", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            postId={item._id}
            username={item.author.username}
            textContent={item.textContent}
            avatar={item.author.avatar}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
