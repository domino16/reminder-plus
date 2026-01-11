import * as SMS from "expo-sms";
import { Share, Text, View } from "react-native";
import AppButton from "../components/app-button";
import { useApp } from "../store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { Reminder } from "../types/types"; 

export default function DetailsScreen() {
  const { reminderString } = useLocalSearchParams<{ reminderString: string }>();
  const reminderItem = JSON.parse(reminderString) as Reminder;
  const { phone, smsText, deleteReminder } = useApp();
  const router = useRouter();

  async function sendSms() {
    if (!(await SMS.isAvailableAsync())) {
      alert("SMS not available");
      return;
    }
    await SMS.sendSMSAsync(phone, `${smsText} ${reminderItem.title}`);
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginVertical:15 }}>{reminderItem.title}</Text>

      <AppButton title="Wyślij SMS" onPress={sendSms} />
      <AppButton
        title="Udostępnij"
        variant="secondary"
        onPress={() => Share.share({ message:`${smsText} ${reminderItem.title}`})}
      />
      <AppButton
        title="Edytuj"
        variant="secondary"
       onPress={() => router.push({ pathname: "/add-edit", params: { reminderString: JSON.stringify(reminderItem) } })}
      />
      
   <AppButton
        title="Usuń"
        variant="danger"
        onPress={async () => {
          await deleteReminder(reminderItem.id);
          router.back();
        }}
      />

    </View>
  );
}
