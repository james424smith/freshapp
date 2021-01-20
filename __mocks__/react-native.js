import * as ReactNative from "react-native";

export * from "react-native";
export const Vibration = { vibrate: jest.fn() };
export const Adnimated = { spring: jest.fn() };

export default Object.setPrototypeOf(
  {
    Vibration,
    Adnimated,
  },
  ReactNative
);
