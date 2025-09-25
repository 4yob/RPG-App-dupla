import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ text, onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onPress();

    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPress={handlePress}
      activeOpacity={1}
      >
      <Text
        style={[styles.buttonText, isPressed && styles.buttonTextPressed]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#145DA0",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderWidth: 2,
    borderColor: "#BFD7ED",
  },
  buttonPressed: {
    backgroundColor: "#BFD7ED",
    borderColor: "#145DA0",
  },
  buttonText: {
    color: "#BFD7ED",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextPressed: {
    color: "#145DA0",
  },
});