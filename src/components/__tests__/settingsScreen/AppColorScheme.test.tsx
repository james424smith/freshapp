import React from "react";
import AppColorScheme from "../../settingsScreen/AppColorScheme";
import { render, cleanup } from "@testing-library/react-native";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("AppColorScheme snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui", () => {
    const changeModalVisible = jest.fn();
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <AppColorScheme changeModalVisible={changeModalVisible} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
