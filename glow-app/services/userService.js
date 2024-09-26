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
  // console.log("token in getFollowedPosts service", token);

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
    // console.log("followed posts", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProducts(query) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/products/query?q=${query}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    // console.log("products in service", json);
    return json;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// GET products for modal content
export async function getAddedProducts(productIds) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/products/added`;

  const idString = productIds.join("-"); //need to join all my ids together
  console.log("idStrings", idString)

  try {
    const queryString = new URLSearchParams({
      q: idString,
    }).toString();
    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    // console.log("products in added product service", json);
    return json;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Create Post
export async function createPost (formData) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/posts/`;
  const token = await getToken();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("uploaded post", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// GET post details
export async function getPostDetails (postId) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${postId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

     if (!response.ok) {
       throw new Error(`Response status: ${response.status}`);
     }
     const json = await response.json();
     console.log("post details service:", json)
     return json;
  } catch(error) {
    console.error("Error getting post details", error)
  }
}

// user updates post
export async function updatePost (formData) {
  const postId = formData._id
   const url = `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${postId}`;
   const token = await getToken();
   try {
     const response = await fetch(url, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(formData),
     });
     if (!response.ok) {
       throw new Error(`Response status: ${response.status}`);
     }
     const json = await response.json();
     console.log("updated post", json);
     return json;
   } catch (error) {
     console.error(error.message);
   }
}

// user deletes post
export async function deletePost (postId) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/posts/${postId}`;
  const token = await getToken();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("deleted post", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}