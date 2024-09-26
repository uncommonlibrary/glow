import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPostDetails } from "../../services/userService";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { fetchedUser } from "../../services/authService";

const PostDetails = () => {
  const local = useLocalSearchParams();
  const postId = local.postId;
  // console.log("post id w use params", postId);
  const router = useRouter();

  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId]);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await fetchedUser();
        const currentUsername = currentUser.username;
        // console.log("username retrieved", currentUsername);
        setCurrentUser(currentUsername);
      } catch (error) {
        console.error("Error in checkCurrentUser:", error);
      }
    };
    checkCurrentUser();
  }, []);

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

  const handleOpenLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening product link:", error);
    }
  };

  const goToEdit = () => {
    console.log("postId in view post details", postId);
    router.push(`/posts/editpost?postId=${postId}`);
  };

  const formattedDate = new Date(postDetails.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <View className="flex-col px-4 mt-5 mb-3 bg-highlight h-[77vh] w-[43vh] ml-3 items-center rounded-xl shadow">
        <View className="flex-row gap-3 items-start mt-1">
          <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-full border-primary border justify-center items-center">
              {postDetails.author.avatar ? (
                <Image
                  source={{ uri: postDetails.author.avatar }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Ionicons
                  name="person-circle-sharp"
                  size={45}
                  color={"#C5705D"}
                />
              )}
            </View>

            <View className="justify-center flex-1 ml-3 gap-y-1">
              <Text
                className="text-text text-sm"
                numberOfLines={1}
                style={{ fontFamily: "PlayfairDisplay-Bold" }}
              >
                {postDetails.author.username}
              </Text>
              <Text
                className="text-text text-xs"
                numberOfLines={1}
                style={{ fontFamily: "PlayfairDisplay-Regular" }}
              >
                {formattedDate}
              </Text>
            </View>
            {currentUser === postDetails.author.username ? (
              <TouchableOpacity onPress={goToEdit}>
                <Text>Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View className="justify-center items-center">
          <View className="w-[30vh] h-[30vh] rounded-xl mt-1">
            {postDetails.postPhoto ? (
              <Image
                source={{ uri: postDetails.postPhoto }}
                style={{ width: 250, height: 250 }}
                className="rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <View className="flex justify-center items-center h-[250px]">
                <Fontisto name="heart-eyes" size={70} color="#342E37" />
                <Text className="mt-[15]">No Image Available</Text>
              </View>
            )}
          </View>
          <View>
            <Text
              className="text-text text-sm mb-5"
              numberOfLines={10}
              style={{
                fontFamily: "PlayfairDisplay-Regular",
                textAlign: "left",
              }}
            >
              {postDetails.textContent}
            </Text>
          </View>
        </View>

        <View>
          <Text
            className="text-left text-xl"
            style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
          >
            Product(s) Featured
          </Text>
          <View>
            {!postDetails?.makeupProduct ||
            postDetails.makeupProduct.length === 0 ? (
              <Text className="text-center text-text mt-4">
                Nothing to feature!
              </Text>
            ) : (
              <ScrollView horizontal>
                {postDetails.makeupProduct.map((product, index) => (
                  <View key={index}>
                    <Image
                      className="rounded-xl self-center"
                      source={{ uri: product.productPhoto }}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                      }}
                    />
                    <Text className="text-text text-center">
                      {product.productName}
                    </Text>
                    <Text className="text-xs text-text text-center">
                      {product.variation}
                    </Text>
                    <Text className="text-primary text-center">
                      {product.brand}
                    </Text>
                    <TouchableNativeFeedback
                      onPress={() => handleOpenLink(product.productLink)}
                    >
                      <View className="bg-primary p-1 mt-1 rounded-xl">
                        <Text
                          className="text-highlight text-center"
                          style={{
                            fontFamily: "PlayfairDisplay-ExtraBold",
                          }}
                        >
                          View
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
        <View className="absolute bottom-4 right-4 left-4">
          <View className="w-full flex-row justify-between items-center mt-2">
            <TouchableOpacity>
              <AntDesign name="hearto" size={20} color="#342E37" />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome6 name="comment" size={20} color="#342E37" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Fontisto name="bookmark" size={20} color="#342E37" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetails;
