import { StyleSheet, FlatList } from "react-native";
import { useState } from "react";

export default function CharacterCard({ data, keyExtractor, renderItem }) {
    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    )
}