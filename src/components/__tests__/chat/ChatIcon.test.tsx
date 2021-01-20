ChatIcon;
import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import ChatIcon from "../../chat/ChatIcon";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("ChatIcon snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const mockedState = {
    websocketReducer: {
      history: [
        { unreadCount: 2 },
        { unreadCount: 2 },
        { unreadCount: 0 },
        { unreadCount: undefined },
      ],
    },
  };
  const mockedStore = configureMockStore();

  it("should render ChatIcon correctly as per the ui made when focused is true", () => {
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatIcon mainIconSize={20} focused={true} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ChatIcon correctly as per the ui made when focused is false", () => {
    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatIcon mainIconSize={20} focused={false} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
