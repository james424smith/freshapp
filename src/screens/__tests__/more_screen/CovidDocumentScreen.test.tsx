import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import CovidDocumentScreen from "../../more_screens/CovidDocumentScreen";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("CovidDocumentScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render CovidDocumentScreen when loader is false ", () => {
    const mockedState = {
      covidDocument: {
        covidDocument: "1234",
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <CovidDocumentScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render CovidDocumentScreen when loader is false  and covidDocument is undefined", () => {
    const mockedState = {
      covidDocument: {
        covidDocument: undefined,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <CovidDocumentScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render CovidDocumentScreen when loader is true ", () => {
    const mockedState = {
      covidDocument: {
        covidDocument: "1234",
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <CovidDocumentScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
