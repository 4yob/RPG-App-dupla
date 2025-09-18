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
        borderColor: "#E69A28",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#F4E4BC",
        color: "#1A0E0A",
        fontSize: 16,
    },
});