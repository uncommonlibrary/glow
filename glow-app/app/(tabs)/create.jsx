import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const [formData, setFormData] = useState({
    textContent: "",
    postPhoto: "",
    makeupProduct: [],
  });

  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <View className="flex-col px-4 mt-5 mb-3 bg-highlight h-[50vh] w-[43vh] ml-3 items-center rounded-xl shadow">
        <View className="flex-row gap-3 items-start mt-1">
          <View className="justify-between items-center flex-row flex-1">
            <TouchableOpacity>
              <Text
                className="text-primary"
                style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <Text
              className="text-text text-2xl"
              style={{ fontFamily: "PlayfairDisplay-Bold" }}
            >
              New Post
            </Text>

            <TouchableOpacity>
              <View className="bg-primary p-2 rounded-xl">
                <Text
                  className="text-highlight"
                  style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
                >
                  Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;
