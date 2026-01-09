import { View, Text, StyleSheet } from "react-native";
import AppButton from "../components/app-button";
import { theme } from "../constants/theme";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping</Text>
      <Text style={styles.time}>14:00</Text>

      <AppButton title="Send SMS" onPress={() => {}} />
      <AppButton title="Share" variant="secondary" onPress={() => {}} />
      <AppButton title="Delete" variant="danger" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  time: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 24,
  },
});
