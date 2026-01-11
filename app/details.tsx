import * as SMS from "expo-sms";
import { Share, Text, View } from "react-native";
import AppButton from "../components/app-button";
import { useApp } from "../store/store";
import { useRouter } from "expo-router";

export default function DetailsScreen() {
  const { phone, smsText, deleteReminder } = useApp();
  const router = useRouter();

  async function sendSms() {
    if (!(await SMS.isAvailableAsync())) {
      alert("SMS not available");
      return;
    }
    await SMS.sendSMSAsync(phone, smsText);
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Shopping</Text>

      <AppButton title="Send SMS" onPress={sendSms} />
      <AppButton
        title="Share"
        variant="secondary"
        onPress={() => Share.share({ message: "Shopping reminder" })}
      />
      <AppButton
        title="Delete"
        variant="danger"
        onPress={async () => {
          await deleteReminder("1");
          router.back();
        }}
      />
    </View>
  );
}
