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

// get username from token
export const fetchedUser = async () => {
   const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/`
   const token = await getToken();
   try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error("Error fetching username:", error)
  }
}