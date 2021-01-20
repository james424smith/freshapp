import React from "react";
import TermsAndConditionsScreen from "../../authentication/TermsAndConditionsScreen";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("TermsAndConditionsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when focus is true when termsAndConditionsDocument is present", () => {
    const mockedState = {
      termsAndConditionsDetails: {
        termsAndConditionsDetails: {
          document: "1234",
        },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <TermsAndConditionsScreen />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui when focus is true when termsAndConditionsDocument is undefined", () => {
    const mockedState = {
      termsAndConditionsDetails: {
        termsAndConditionsDetails: {
          document: undefined,
        },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <TermsAndConditionsScreen />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
