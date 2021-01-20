import React from "react";
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import MoreScreen from "../MoreScreen";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import * as handleLink from "../../common/handleLink";
import * as RNA from "react-native-appearance";

describe("MoreScreen snapshot test", () => {
  const spy = jest.spyOn(handleLink, "handleLink").mockResolvedValue();
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spy.mockRestore();
  });

  it("should render MoreScreen for dark-mode", async () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("dark")
    );
    const mockedState = {
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreScreen />
      </Provider>
    );
    const buttons = getAllByTestId("more-button");

    buttons.map((b) => {
      fireEvent.press(b);
    });

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render MoreScreen for light-mode", async () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("light")
    );
    const mockedState = {
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreScreen />
      </Provider>
    );
    const buttons = getAllByTestId("more-button");

    buttons.map((b) => {
      fireEvent.press(b);
    });

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
