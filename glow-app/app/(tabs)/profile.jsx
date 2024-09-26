import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      console.log("User logged out");
      router.replace("/login")
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <Text
        className="text-text text-2xl"
        style={{ fontFamily: "PlayfairDisplay-Bold" }}
      >
        Profile
      </Text>
      <View className="flex-1 items-center justify-center p-4">
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
              title="Under Construction"
              subtitle="I'm working on it!"
            />
          )}
          className="w-full"
        />
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-primary w-[10vh] rounded-xl py-2"
        >
          <Text
            className="text-highlight text-center"
            style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
