import AsyncStorage from "@react-native-async-storage/async-storage";

// save token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};

// get token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    // console.log("token in get token async storage:", token)
    return token || null;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};
