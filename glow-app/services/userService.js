import { getToken } from "./authService";

// create user
export async function signupUser(formData) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/signup`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// log in user
export async function loginUser(formData) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// get current user
export async function getCurrentUser() {
  // kiv
}

// show posts from users I follow
export async function getFollowedPosts() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/posts/`;
  const token = await getToken();
  console.log("token in getFollowedPosts service", token)

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
    console.log("followed posts", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
