import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title, subtitle, subtitle2 }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.subtitle}>{subtitle2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#D4F1F4",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
    color: "#2871c5ff",
  },
});
