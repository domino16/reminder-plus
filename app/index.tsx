import { Reminder } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/app-button";
import ReminderItem from "../components/reminder-item";
import { theme } from "../constants/theme";
import { useApp } from "../store/store";
import { formatterDate } from "../utilis/dateFormatter";


export default function HomeScreen() {
  const router = useRouter();
  const { reminders } = useApp();
  const filteredReminders = reminders
  .filter(item => new Date(item.time) >= new Date())
  .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

// Prośba o zgodę na powiadomienia
  async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Brak zgody na powiadomienia!');
  }
}
let test:Date
if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
  });
}

requestPermissions();


  // Zaplanowanie powiadomienia 3h wcześnie
 async function scheduleReminderNotification(reminder: Reminder) {
  const reminderTime = new Date(reminder.time).getTime();
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const notificationTime = reminderTime - THREE_HOURS;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'ReminderPlus',
      body: reminder.title,
      data: {
        reminderId: reminder.id,
      },
    },
    trigger: {  type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: notificationTime}
  });
}

 async function scheduleAllReminders(reminders: Reminder[]) {
  for (const reminder of reminders) {
    await scheduleReminderNotification(reminder);
  }
}

scheduleAllReminders(filteredReminders);

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