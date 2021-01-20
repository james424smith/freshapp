import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import ImprintScreen from "../../more_screens/ImprintScreen";
import imprint from "../../../../__mocks__/fake-data/imprintDetails.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import * as handleLink from "../../../common/handleLink";
import { Auth } from "aws-amplify";

describe("ImprintScreen snapshot test", () => {
  const spy = jest.spyOn(handleLink, "handleLink");

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spy.mockRestore();
  });

  it("should render ImprintScreen when loader is false when user is Signed In", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: 1234 });
    const mockedState = {
      imprintDetails: {
        imprintDetails: imprint,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ImprintScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("phone-button"));
    fireEvent.press(getByTestId("fax-button"));
    fireEvent.press(getByTestId("email-button"));
    fireEvent.press(getByTestId("contactEmail-button"));
    fireEvent.press(getByTestId("website-button"));

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ImprintScreen when loader is false when user is not Signed In", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);
    const mockedState = {
      imprintDetails: {
        imprintDetails: imprint,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ImprintScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ImprintScreen when loader is false and imprintDetails is empty", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);
    const mockedState = {
      imprintDetails: {},
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ImprintScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
