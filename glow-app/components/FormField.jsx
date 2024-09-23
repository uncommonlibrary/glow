import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

//import icons
import Entypo from "@expo/vector-icons/Entypo";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text
        className="text-base text-text"
        style={{ fontFamily: "PlayfairDisplay-Medium" }}
      >
        {title}
      </Text>
      <View className="w-full h-14 px-4 bg-highlight rounded-xl items-center shadow flex-row">
        <TextInput
          className="flex-1 text-text  w-full"
          style={{ fontFamily: "PlayfairDisplay-Medium" }}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title.includes("Password") && !showPassword}
          {...props}
        />
        {title.includes("Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Entypo name="eye" size={20} color="#342E37" />
            ) : (
              <Entypo name="eye-with-line" size={20} color="#342E37" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
