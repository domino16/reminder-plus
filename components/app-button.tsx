import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../constants/theme";
import { ReactNode } from "react";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
}: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: colors[variant] },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const colors = {
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  danger: theme.colors.error,
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: theme.radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});