import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

//icons import
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "#F8EDE3" },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <View
                className="items-center justify-center gap-0.5"
                style={{ top: 10 }}
              >
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#C5705D" : "#D0B8A8"}
                />
                <Text
                  className={`${focused ? "font-semibold" : "font-normal"}`}
                  style={{ color: "#C5705D" }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <View
                className="items-center justify-center gap-0.5"
                style={{ top: 10 }}
              >
                <Entypo
                  name="squared-plus"
                  size={24}
                  color={focused ? "#C5705D" : "#D0B8A8"}
                />
                <Text
                  className={`${focused ? "font-semibold" : "font-normal"}`}
                  style={{ color: "#C5705D" }}
                >
                  Create Post
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            headerShown: false,
            title: "Bookmarks",
            tabBarIcon: ({ color, focused }) => (
              <View
                className="items-center justify-center gap-0.5"
                style={{ top: 10 }}
              >
                <Fontisto
                  name="bookmark-alt"
                  size={24}
                  color={focused ? "#C5705D" : "#D0B8A8"}
                />
                <Text
                  className={`${focused ? "font-semibold" : "font-normal"}`}
                  style={{ color: "#C5705D" }}
                >
                  Bookmarks
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <View
                className="items-center justify-center gap-0.5"
                style={{ top: 10 }}
              >
                <Ionicons
                  name="person-circle-sharp"
                  size={24}
                  color={focused ? "#C5705D" : "#D0B8A8"}
                />
                <Text
                  className={`${focused ? "font-semibold" : "font-normal"}`}
                  style={{ color: "#C5705D" }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;