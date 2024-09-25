import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";

//to add photos
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getProducts } from "../../services/userService";

const Create = () => {
  const [formData, setFormData] = useState({
    textContent: "",
    postPhoto: "",
    makeupProduct: [],
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      setFormData({ ...formData, postPhoto: imageURI });
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSearch = async (query) => {
    const fetchedProducts = await getProducts(query)
    setSearchResults(fetchedProducts);
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Text
          className="text-primary text-center"
          style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
        >
          Glow
        </Text>
        <View className="flex-col px-4 mt-5 mb-3 bg-highlight h-[70vh] w-[43vh] ml-3 items-center rounded-xl shadow">
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

          <View className="border w-full h-[25vh]">
            <TextInput
              className="flex-1 text-text"
              style={{ fontFamily: "PlayfairDisplay-Regular" }}
              value={formData.textContent}
              placeholder="What's glowing?"
              onChangeText={(event) =>
                setFormData({ ...formData, textContent: event })
              }
              numberOfLines={10}
              multiline={true}
              textAlignVertical="top"
            />
            <TouchableOpacity onPress={pickImageAsync}>
              <View className="flex-row justify-end items-center pr-2">
                <FontAwesome name="photo" size={20} color="#C5705D" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full">
            <Text
              className="text-left text-xl"
              style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
            >
              Product(s) Featured
            </Text>

            <SearchInput onSearch={handleSearch} />

            {isSearching ? (
              <Text>Loading search results...</Text>
            ) : searchResults.length > 0 ? (
              <View className="mt-4">
                <Text className="text-secondary">Search Results:</Text>
                <ScrollView horizontal>
                  {searchResults.map((product, index) => (
                    <View key={index} className="mr-4">
                      <Image
                        source={{ uri: product.productPhoto }}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "contain",
                        }}
                      />
                      <Text className="text-text">{product.productName}</Text>
                      <Text className="text-secondary">{product.brand}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <Text>No search results found.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
