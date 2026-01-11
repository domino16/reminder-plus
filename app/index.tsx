import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/app-button";
import ReminderItem from "../components/reminder-item";
import { theme } from "../constants/theme";
import { useApp } from "../store/store";
import { formatterDate } from "../utilis/dateFormatter";
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export default function HomeScreen() {
  const router = useRouter();
  const { reminders } = useApp();
  const filteredReminders = reminders
  .filter(item => new Date(item.time) >= new Date())
  .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());


  async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Brak zgody na powiadomienia!');
  }
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
  });
}

  return (
    <View style={styles.container}>
         <Stack.Screen
        options={{
          title: "ReminderPlus",
          headerRight: () => (
              <View style={{ flexDirection: "row", gap: 16 }}>
        <Pressable onPress={() => router.push("/history")}>
          <Ionicons name="time-outline" size={22} />
        </Pressable>

        <Pressable onPress={() => router.push("/settings",)}>
          <Ionicons name="settings-outline" size={22} />
        </Pressable>
      </View>
          ),
        }}
      />
      <Text style={styles.header}>ReminderPlus</Text>

      <FlatList
        data={filteredReminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReminderItem
            title={item.title}
            time={formatterDate(item.time)}
            onPress={() => router.push({ pathname: "/details", params: { reminderString: JSON.stringify(item) } })}
          />
        )}
      />

      <AppButton
        title="Stwórz nowe przypomnienie"
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