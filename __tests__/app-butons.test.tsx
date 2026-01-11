import { render, fireEvent } from "@testing-library/react-native";
import AppButton from "../components/app-button";

test("AppButton calls onPress", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <AppButton title="Click me" onPress={fn} />
  );

  fireEvent.press(getByText("Click me"));
  expect(fn).toHaveBeenCalled();
});