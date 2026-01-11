import { Stack } from "expo-router";
import { AppProvider } from "../store/store";

export default function RootLayout() {
  return (
      <AppProvider>

    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F9FAFB" },
        headerShadowVisible: false,
      }} 
    />
    </AppProvider>
  );
}