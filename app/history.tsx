import { View, Text, FlatList } from "react-native";
import { useApp } from "../store/store";
import ReminderItem from "../components/reminder-item";
import { useRouter } from "expo-router";
import { formatterDate } from "@/utilis/dateFormatter";

export default function HistoryScreen() {
const { reminders } = useApp();
const router = useRouter();
 const filteredReminders = reminders
  .filter(item => new Date(item.time) <= new Date())
  .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  if (filteredReminders.length === 0) {
    return <Text style={{ padding: 16 }}>Brak archiwalnych przypomnień</Text>;
  } 


  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
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
  );
}