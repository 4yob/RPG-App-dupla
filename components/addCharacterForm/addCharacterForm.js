import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function AddCharacterForm({ placeholder, value, onChangeText, onSubmitEditing }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 2,
        borderColor: "0C2D48",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#D9E4EC",
        color: "#1A0E0A",
        fontSize: 16,
    },
});