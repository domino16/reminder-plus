import { View, TextInput, Text, StyleSheet } from "react-native";
import { useApp } from "../store/store";
import { theme } from "../constants/theme";

export default function SettingsScreen() {
   const { phone, smsText, updatePhone, updateSmsText } = useApp();


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone number</Text>
      <TextInput value={phone} onChangeText={updatePhone} style={styles.input} />

      <Text style={styles.label}>SMS content</Text>
      <TextInput value={smsText} onChangeText={updateSmsText} style={styles.input} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  input: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 4 },
});