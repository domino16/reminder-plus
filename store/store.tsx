import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import * as Crypto from 'expo-crypto';

type Reminder = {
  id: string;
  title: string;
  time: Date;
};

type NewReminder = Omit<Reminder, "id">;

type AppState = {
  reminders: Reminder[];
  phone: string;
  smsText: string;
};

type AppContextType = AppState & {
  addReminder: (r: Reminder) => void;
  deleteReminder: (id: string) => void;
  updatePhone: (v: string) => void;
  updateSmsText: (v: string) => void;
  loading: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "APP_STATE";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    reminders: [],
    phone: "",
    smsText: "Reminder!",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loading]);

  // --- ACTIONS ---
 const addReminder = (r: NewReminder) =>
  setState(s => ({
    ...s,
    reminders: [
      ...s.reminders,
      {
        id: Crypto.randomUUID(),
        ...r,
      },
    ],
  }));

  const deleteReminder = (id: string) =>
    setState(s => ({
      ...s,
      reminders: s.reminders.filter(r => r.id !== id),
    }));

  const updatePhone = (v: string) =>
    setState(s => ({ ...s, phone: v }));

  const updateSmsText = (v: string) =>
    setState(s => ({ ...s, smsText: v }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        addReminder,
        deleteReminder,
        updatePhone,
        updateSmsText,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}