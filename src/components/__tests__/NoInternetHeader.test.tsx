import React from "react";
import NoInternetHeader from "../NoInternetHeader";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("NoInternetHeader snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should render correct ui isConnected is true", () => {
    const mockedState = {
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NoInternetHeader />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui isConnected is false", () => {
    const mockedState = {
      network: { isConnected: false },
    };
    const mockedStore = configureMockStore();
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NoInternetHeader />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
