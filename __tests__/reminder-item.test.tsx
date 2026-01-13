import { fireEvent, render } from "@testing-library/react-native";
import ReminderItem from "../components/reminder-item";

test("ReminderItem calls onPress after press", () => {
  const fn = jest.fn();

  const { getByText } = render(
    <ReminderItem
      title="Test reminder"
      time="12:30"
      onPress={fn}
    />
  );

  fireEvent.press(getByText("Test reminder"));
  expect(fn).toHaveBeenCalled();
});