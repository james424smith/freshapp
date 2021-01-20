import React from "react";
import NewMessageAlert from "../NewMessageAlert";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("NewMessageAlert snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should render correct ui when notificationToShow is defined", () => {
    const mockedState = {
      websocketReducer: {
        notificationToShow: {
          notification: {
            notificationBody: "Giorgos says: Hello there",
          },
        },
      },
    };
    const mockedStore = configureMockStore();

    const wrapper = render(
      <Provider store={mockedStore(mockedState)}>
        <NewMessageAlert />
      </Provider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when notificationToShow is undefined", () => {
    const mockedState = {
      websocketReducer: {
        notificationToShow: undefined,
      },
    };
    const mockedStore = configureMockStore();

    const wrapper = render(
      <Provider store={mockedStore(mockedState)}>
        <NewMessageAlert />
      </Provider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
