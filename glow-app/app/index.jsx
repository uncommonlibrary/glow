import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Text, ScrollView, View, Image } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center min-h-[85vh] justify-center px-4">
          <Text
            className="text-primary"
            style={{ fontFamily: "Pacifico-Regular", fontSize: "65" }}
          >
            Glow
          </Text>
          <Image
            source={require("../assets/images/makeup.png")}
            className="max-w-[225px] w-full h-[225px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text
              className="text-3xl text-primary text-center"
              style={{ fontFamily: "PlayfairDisplay-Bold" }}
            >
              Discover, Curate, Connect
            </Text>
            <Text
              className="mt-[10]"
              style={{
                fontFamily: "PlayfairDisplay-Regular",
                fontSize: "16",
              }}
            >
              Social media, but for makeup and skincare.
            </Text>
          </View>
          <CustomButton
            title="Get Started"
            handlePress={() => router.replace("/login")}
            containerStyles="w-60 mt-7"
            textStyles="text-highlight text-xl"
          />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
