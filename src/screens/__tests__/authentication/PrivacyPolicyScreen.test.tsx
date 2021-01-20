import React from "react";
import PrivacyPolicyScreen from "../../authentication/PrivacyPolicyScreen";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("PrivacyPolicyScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when focus is true when privacyPolicyDocument is present", () => {
    const mockedState = {
      privacyPolicyDetails: {
        privacyPolicyDetails: {
          document: "1234",
        },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PrivacyPolicyScreen />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui when focus is true when employmentOfferDocument is undefined", () => {
    const mockedState = {
      privacyPolicyDetails: {
        privacyPolicyDetails: {
          document: undefined,
        },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PrivacyPolicyScreen />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
