import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { format } from "date-fns";

const PostCard = ({
  postId,
  username,
  textContent,
  avatar,
  postPhoto,
  createdAt,
}) => {
  const router = useRouter();

  const handlePress = () => {
    console.log("postId in post card", postId);
    router.push(`/posts/${postId}`);
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <View className="flex-col px-4 mt-5 mb-3 bg-highlight h-[50vh] w-[43vh] ml-3 items-center rounded-xl shadow">
      <View className="flex-row gap-3 items-start mt-1">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-full border-primary border justify-center items-center">
            {avatar ? (
              <Image
                source={{ uri: avatar }}
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
              {username}
            </Text>
            <Text
              className="text-text text-xs"
              numberOfLines={1}
              style={{ fontFamily: "PlayfairDisplay-Regular" }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <View className="justify-center items-center">
          <View className="w-[30vh] h-[30vh] rounded-xl mt-1">
            {postPhoto ? (
              <Image
                source={{ uri: postPhoto }}
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
              numberOfLines={2}
              style={{
                fontFamily: "PlayfairDisplay-Regular",
                textAlign: "left",
              }}
            >
              {textContent}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

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
  );
};

export default PostCard;
