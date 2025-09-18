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
    backgroundColor: "#C5282F",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderWidth: 2,
    borderColor: "#E69A28",
  },
  buttonText: {
    color: "#E69A28",
    fontSize: 18,
    fontWeight: "bold",
  },
});