import { StyleSheet, FlatList } from "react-native";
import { useState } from "react";

export default function CharacterCard({ data, keyExtractor, renderItem }) {
    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingHorizontal: 5,
    },
    contentContainer: {
        paddingBottom: 30,
        paddingTop: 10,
    },
});