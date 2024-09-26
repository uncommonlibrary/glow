import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, useRouter } from "expo-router";
import { loginUser } from "../../services/userService";
import { saveToken } from "../../services/authService";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    passwordHash: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!formData.username || !formData.passwordHash) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSubmitting(true);

    try {
      const json = await loginUser(formData);
      // console.log("json in submit login", json)
      const token = json.token;
      await saveToken(token);

      router.replace("/home");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
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
            Log In to Your Account
          </Text>

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
            title="Password"
            placeholder="E.g. 123"
            value={formData.passwordHash}
            handleChangeText={(event) =>
              setFormData({ ...formData, passwordHash: event })
            }
            otherStyles="mt-5 shadow"
          />

          <View className="justify-center items-center pt-5 gap-1">
            <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles="w-60 mt-7 mb-2"
              textStyles="text-highlight text-xl"
              isLoading={isSubmitting}
            />
            <Text
              className="text-sm text-text"
              style={{ fontFamily: "PlayfairDisplay-Medium" }}
            >
              Need an account?{" "}
              <Link
                href="/signup"
                className="text-sm text-primary"
                style={{ fontFamily: "PlayfairDisplay-Medium" }}
              >
                Register here
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;