import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import ContactScreen from "../../more_screens/ContactScreen";
import Contact from "../../../../__mocks__/fake-data/contactApi.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("ContactScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render ContactScreen when loader is false ", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ContactScreen when loader is false and selectedType is CREW_MANAGER", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    fireEvent.press(getAllByTestId("category-button")[0]);

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ContactScreen when loader is false and selectedType is MANNING_AGENT", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    fireEvent.press(getAllByTestId("category-button")[1]);

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ContactScreen when loader is false and selectedType is PORT_AGENT", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    fireEvent.press(getAllByTestId("category-button")[2]);

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ContactScreen when loader is true ", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
});
