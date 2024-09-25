import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPostDetails } from "../../services/userService";

const PostDetails = () => {
  const local = useLocalSearchParams();
  const postId = local.postId;
  console.log("post id w use params", postId);

  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const fetchedPostDetails = await getPostDetails(postId);
      // console.log("post details", fetchedPostDetails);
      setPostDetails(fetchedPostDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!postDetails) {
    return <Text>Post not found</Text>;
  }

  return (
    <SafeAreaView>
      <Text>{postDetails.textContent}</Text>
    </SafeAreaView>
  );
};

export default PostDetails;
