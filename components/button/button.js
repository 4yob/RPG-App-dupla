import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
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
    borderColor: "#0C2D48",
  },
  buttonText: {
    color: "#BFD7ED",
    fontSize: 18,
    fontWeight: "bold",
  },
});