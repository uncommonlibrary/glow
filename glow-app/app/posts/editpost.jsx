import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const EditPost = () => {
  const { postId } = useLocalSearchParams();
  console.log("postId received", {postId});
  return (
    <SafeAreaView>
      <Text>Edit page</Text>
    </SafeAreaView>
  );
};

export default EditPost;
