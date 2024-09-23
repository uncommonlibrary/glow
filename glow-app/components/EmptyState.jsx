import { View, Text } from "react-native";
import React from "react";

import Fontisto from "@expo/vector-icons/Fontisto";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="items-center h-full mt-[30vh]">
      <Fontisto name="heart-eyes" size={30} color="#342E37" />
      <Text
        className="mt-2 text-text text-lg"
        style={{ fontFamily: "PlayfairDisplay-Bold" }}
      >
        {title}
      </Text>
      <Text
        className="mt-2 text-text"
        style={{ fontFamily: "PlayfairDisplay-Regular" }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
