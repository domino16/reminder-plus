import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AppButton from "../components/app-button";
import { theme } from "../constants/theme";

export default function AddEditScreen() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New reminder</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <AppButton
        title="Save"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: theme.radius.md,
    fontSize: 16,
    marginBottom: 12,
  },
});