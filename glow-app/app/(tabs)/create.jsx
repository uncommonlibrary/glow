import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import SearchInput from "../../components/SearchInput";
import ProductModal from "../../components/ProductModal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

//to add photos
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  getProducts,
  getAddedProducts,
  createPost,
} from "../../services/userService";

const Create = () => {
  const [formData, setFormData] = useState({
    textContent: "",
    postPhoto: "",
    makeupProduct: [],
  });

  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);

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
    if (!query.trim()) {
      Alert.alert("Search query required", "Please enter a search query.");
      return;
    }
    setIsSearching(true);
    try {
      const fetchedProducts = await getProducts(query);
      setSearchResults(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddProduct = (productId) => {
    // console.log("Product id in create handle add", productId);
    setFormData((prevData) => ({
      ...prevData,
      makeupProduct: prevData.makeupProduct.includes(productId)
        ? prevData.makeupProduct.filter((id) => id !== productId)
        : [...prevData.makeupProduct, productId],
    }));
  };

  useEffect(() => {
    if (isModalVisible && formData.makeupProduct.length > 0) {
      console.log("Fetching modal content", formData.makeupProduct);
      const fetchModalContent = async () => {
        try {
          const productIds = formData.makeupProduct;
          // console.log("productIds inside useEffect", productIds)
          const fetchedProducts = await getAddedProducts(productIds);
          // console.log("fetchedProducts in useeffect", fetchedProducts);
          setModalContent(fetchedProducts);
        } catch (error) {
          console.error("Error fetching modal content:", error);
        }
      };
      fetchModalContent();
    } else if (isModalVisible && formData.makeupProduct.length === 0) {
      setModalContent([]);
    }
  }, [formData.makeupProduct, isModalVisible]);

  const viewAddedProducts = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmitPost = async () => {
    try {
      // console.log("submitted form Data to create", formData)
      await createPost(formData);
      router.navigate("/home");
      setFormData({
        textContent: "",
        postPhoto: "",
        makeupProduct: [],
      });
      setSearchResults(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const cancelPost = () => {
    Alert.alert(
      "Delete draft?",
      "Are you sure you want to cancel this draft?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: "Delete Draft",
          onPress: () => {
            setFormData({
              textContent: "",
              postPhoto: "",
              makeupProduct: [],
            });
            setSearchResults(null);
          }
        },
      ]
    );
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
              <TouchableOpacity onPress={cancelPost}>
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

              <TouchableOpacity onPress={handleSubmitPost}>
                <View className="bg-primary p-2 rounded-xl">
                  <Text
                    className="text-highlight text-center"
                    style={{ fontFamily: "PlayfairDisplay-ExtraBold" }}
                  >
                    Post
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full h-[25vh]">
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
            <View className="flex-row justify-end items-center pr-2">
              <TouchableOpacity className="mr-5" onPress={viewAddedProducts}>
                {/* Show modal of products added */}
                <FontAwesome5 name="list-alt" size={20} color="#C5705D" />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImageAsync}>
                <FontAwesome name="photo" size={20} color="#C5705D" />
              </TouchableOpacity>
            </View>
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
            ) : searchResults === null ? (
              <></>
            ) : searchResults.length === 0 ? (
              <Text>No products found</Text>
            ) : (
              <View className="mt-4">
                <Text className="text-primary">
                  Found {searchResults.length} result(s):
                </Text>
                <ScrollView horizontal>
                  {searchResults.map((product) => (
                    <View key={product._id} className="mr-4">
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
                      <TouchableOpacity
                        onPress={() => handleAddProduct(product._id)}
                      >
                        <View className="bg-primary p-1 mt-1 rounded-xl">
                          {formData.makeupProduct.includes(product._id) ? (
                            <Text
                              className="text-highlight text-center"
                              style={{
                                fontFamily: "PlayfairDisplay-ExtraBold",
                              }}
                            >
                              Remove
                            </Text>
                          ) : (
                            <Text
                              className="text-highlight text-center"
                              style={{
                                fontFamily: "PlayfairDisplay-ExtraBold",
                              }}
                            >
                              Add
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        <View className="flex-1 items-center justify-center">
          <ProductModal isVisible={isModalVisible} onClose={onModalClose}>
            <ScrollView horizontal>
              {modalContent.length > 0 ? (
                modalContent.map((product) => (
                  <View
                    key={product.createdAt}
                    className="h-[30vh] mt-4 ml-4 mr-2 p-4 bg-white rounded-lg shadow-md justify-center"
                  >
                    <Image
                      className="rounded-xl mx-auto mb-2 self-center"
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
                  </View>
                ))
              ) : (
                <Text>No products added yet!</Text>
              )}
            </ScrollView>
          </ProductModal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
