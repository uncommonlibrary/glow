import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signupUser } from "../../services/userService";
import { saveToken } from "../../services/authService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    passwordHash: "",
    confirmPw: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.passwordHash
    ) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSubmitting(true);

    try {
      const json = await signupUser(formData);
      // console.log("json in signup", json);
      // console.log("token in signup", json["token"]);
      const token = json["token"];
      // Check if the response has a token property
      if (token) {
        // Store the token in AsyncStorage
        await saveToken(token);

        // Navigate to home screen
        router.navigate("/home");
      } else {
        console.error("Response does not contain token");
        Alert.alert("Error", "Failed to obtain token");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <KeyboardAwareScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Text
            className="text-primary text-center"
            style={{ fontFamily: "Pacifico-Regular", fontSize: "65" }}
          >
            Glow
          </Text>

          <Text
            className="text-2xl text-text mt-5"
            style={{ fontFamily: "PlayfairDisplay-Bold" }}
          >
            Create an Account
          </Text>
          <FormField
            title="Display Name"
            placeholder="E.g. Jane Doe"
            value={formData.name}
            handleChangeText={(event) =>
              setFormData({ ...formData, name: event })
            }
            otherStyles="mt-5 shadow"
          />
          <FormField
            title="Username"
            placeholder="E.g. janedoe23"
            value={formData.username}
            handleChangeText={(event) =>
              setFormData({ ...formData, username: event })
            }
            otherStyles="mt-5 shadow"
          />
          <FormField
            title="Email"
            placeholder="E.g. janedoe@mail.com"
            value={formData.email}
            handleChangeText={(event) =>
              setFormData({ ...formData, email: event })
            }
            otherStyles="mt-5 shadow"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="E.g. password123"
            value={formData.passwordHash}
            handleChangeText={(event) =>
              setFormData({ ...formData, passwordHash: event })
            }
            otherStyles="mt-5 shadow"
          />

          <FormField
            title="Confirm Password"
            placeholder="E.g. password123"
            value={formData.confirmPw}
            handleChangeText={(event) =>
              setFormData({ ...formData, confirmPw: event })
            }
            otherStyles="mt-5 shadow"
          />

          <View className="justify-center items-center pt-5 gap-1">
            <CustomButton
              title="Register"
              handlePress={submit}
              containerStyles="w-60 mt-7 mb-2"
              textStyles="text-highlight text-xl"
              isLoading={isSubmitting}
            />
            <Text
              className="text-sm text-text"
              style={{ fontFamily: "PlayfairDisplay-Medium" }}
            >
              Existing user?{" "}
              <Link
                href="/login"
                className="text-sm text-primary"
                style={{ fontFamily: "PlayfairDisplay-Medium" }}
              >
                Login here
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;