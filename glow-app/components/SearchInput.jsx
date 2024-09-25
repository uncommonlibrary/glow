import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

//import icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, usePathname } from "expo-router";

const SearchInput = ({ onSearch }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View
      className={`w-full h-14 px-4 rounded-xl items-center flex-row space-x-4`}
      style={{ backgroundColor: "#DFD3C3" }}
    >
      <TextInput
        className="flex-1 text-text w-full"
        style={{ fontFamily: "PlayfairDisplay-Medium" }}
        value={query}
        placeholder="Search for a product..."
        onChangeText={(event) => setQuery(event)}
      />

      <TouchableOpacity onPress={() => onSearch(query)}>
        <FontAwesome5 name="search" size={22} color="#342E37" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
