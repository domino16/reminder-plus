import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/app-button";
import ReminderItem from "../components/reminder-item";
import { theme } from "../constants/theme";

const DATA = [
  { id: "1", title: "Meeting", time: "08:00" },
  { id: "2", title: "Shopping", time: "14:00" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReminderPlus</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReminderItem
            title={item.title}
            time={item.time}
            onPress={() => router.push("/details")}
          />
        )}
      />

      <AppButton
        title="Add reminder"
        onPress={() => router.push("/add-edit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
});