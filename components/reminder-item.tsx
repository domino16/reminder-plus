import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../constants/theme";

type Props = {
  title: string;
  time: string;
  onPress: () => void;
};

export default function ReminderItem({ title, time, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: theme.radius.lg,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  time: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginTop: 4,
  },
});