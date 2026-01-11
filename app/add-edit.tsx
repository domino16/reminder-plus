import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../components/app-button";
import { theme } from "../constants/theme";
import { useApp } from "../store/store";
import { Reminder } from '@/types/types';


export default function AddEditScreen() {
  const [title, setTitle] = useState<string>('');
  const { addReminder, editReminder } = useApp();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('Wybierz datę...');
  const [timeText, setTimeText] = useState('Wybierz godzinę...');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { reminderString } = useLocalSearchParams<{ reminderString: string }>();
  const reminderItem = reminderString ? JSON.parse(reminderString) as Reminder : null;
 
  if (reminderItem !== null && title === '') {
    setTitle(reminderItem.title);
    setDateText(new Date(reminderItem.time).toLocaleDateString());
    setTimeText(new Date(reminderItem.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  
    const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDate(currentDate);
    if (selectedDate) {
      setDate(selectedDate);
      
      // Formatowanie widoczne w "inpucie"
      let formattedDate = selectedDate.toLocaleDateString() 
      let formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDateText(formattedDate);
      setTimeText(formattedTime);
    }
  };

 
  return (

    
    <View style={styles.container}>
      <Text style={styles.header}>Nowe przypomnienie</Text>
      
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text: string) => setTitle(text)}
        style={styles.input}
      />

      <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{dateText}</Text>
      </Pressable>
      
      <Pressable onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{timeText}</Text>
      </Pressable>

    {showDatePicker && (
      <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
    )}

    {showTimePicker && (
      <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}

          onChange={onChange}
        />
      )}

{reminderItem === null ?
      (<AppButton
        title="Zapisz"
        onPress={() => {addReminder({title: title, time: date}); router.back();}}
      />):
       (<AppButton
        title="Edytuj"
        onPress={() => {editReminder(reminderItem.id,{title: title, time: date}); router.back();}}
      />)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: theme.radius.md,
    fontSize: 16,
    marginBottom: 12,
  },

  inputText: {
    fontSize: 16,
    color: '#000',
  },
});