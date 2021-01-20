import React from "react";
import DarkModeChangeModal from "../../settingsScreen/DarkModeChangeModal";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import configureMockStore from "redux-mock-store";
import * as ReactRedux from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider } from "react-redux";

describe("DarkModeChangeModal snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when modalVisible is false", () => {
    const changeModalVisible = jest.fn();
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={false}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when modalVisible is true", () => {
    const changeModalVisible = jest.fn();
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui when modalVisible is true and selectedIndex is light", () => {
    const changeModalVisible = jest.fn();
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "light",
      },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when modalVisible is true and selectedIndex is system", () => {
    const changeModalVisible = jest.fn();
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "system",
      },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

describe("test fireEvents", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should call the approprate actions when clicking change-color-dark-button", () => {
    const changeModalVisible = jest.fn();
    const spy = jest.spyOn(ReactRedux, "useDispatch");
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "system",
      },
    };
    AsyncStorage.setItem = jest.fn();

    const mockedStore = configureMockStore();
    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("change-color-dark-button"));
    expect(ReactRedux.useDispatch).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("colorScheme", "dark");
    spy.mockRestore();
  });
  it("should call the approprate actions when clicking change-color-light-button", () => {
    const changeModalVisible = jest.fn();
    const spy = jest.spyOn(ReactRedux, "useDispatch");
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "system",
      },
    };
    AsyncStorage.setItem = jest.fn();

    const mockedStore = configureMockStore();
    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("change-color-light-button"));
    expect(ReactRedux.useDispatch).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("colorScheme", "light");
    spy.mockRestore();
  });
  it("should call the approprate actions when clicking change-color-system-button", () => {
    const changeModalVisible = jest.fn();
    const spy = jest.spyOn(ReactRedux, "useDispatch");
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "system",
      },
    };
    AsyncStorage.setItem = jest.fn();

    const mockedStore = configureMockStore();
    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <DarkModeChangeModal
          changeModalVisible={changeModalVisible}
          modalVisible={true}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("change-color-system-button"));
    expect(ReactRedux.useDispatch).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("colorScheme", "system");
    spy.mockRestore();
  });
});
