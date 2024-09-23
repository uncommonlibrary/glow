import AsyncStorage from "@react-native-async-storage/async-storage";

// save token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};
