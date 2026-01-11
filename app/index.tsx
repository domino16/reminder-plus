import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/app-button";
import ReminderItem from "../components/reminder-item";
import { theme } from "../constants/theme";
import { useApp } from "../store/store";


export default function HomeScreen() {
  const router = useRouter();
  const { reminders } = useApp();
  
  

  return (
    <View style={styles.container}>
         <Stack.Screen
        options={{
          title: "ReminderPlus",
          headerRight: () => (
            <Pressable onPress={() => router.push("/settings")}>
              <Ionicons name="settings-outline" size={24} />
            </Pressable>
          ),
        }}
      />
      <Text style={styles.header}>ReminderPlus</Text>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReminderItem
            title={item.title}
            time={item.time.toLocaleString()}
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