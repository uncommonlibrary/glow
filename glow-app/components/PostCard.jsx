import { View, Text } from "react-native";
import React from "react";

const PostCard = ({
  caption
}) => {
  return (
    <View className="flex-col px-4 mt-5 mb-3 bg-highlight h-[250] w-[43vh] ml-3 items-center rounded-xl shadow">
      <Text>{caption}</Text>
    </View>
  );
};

export default PostCard;
