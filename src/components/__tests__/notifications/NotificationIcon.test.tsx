import React from "react";
import NotificationIcon from "../../notifications/NotificationIcon";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("NotificationIcon snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when focus is true", () => {
    const mockedState = {
      notificationsDetails: {
        notificationsDetails: {
          notificationsDetails: {
            unreadCount: 4,
          },
        },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NotificationIcon focused={true} mainIconSize={20} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when focus is false", () => {
    const mockedState = {
      notificationsDetails: {
        notificationsDetails: {
          notificationsDetails: {
            unreadCount: 4,
          },
        },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NotificationIcon focused={false} mainIconSize={20} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
