import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import NewsScreen from "../../more_screens/NewsScreen";
import news from "../../../../__mocks__/fake-data/news.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Auth } from "aws-amplify";

describe("NewsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render NewsScreen when loader is false when user is signed in", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: 1234 });
    const mockedState = {
      newsDetails: {
        news,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <NewsScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    fireEvent.press(getByTestId("first-option-button"));
    fireEvent.press(getByTestId("second-option-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render NewsScreen when loader is false when user is not signed in", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);
    const mockedState = {
      newsDetails: {
        news,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <NewsScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    fireEvent.press(getByTestId("first-option-button"));
    fireEvent.press(getByTestId("second-option-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
