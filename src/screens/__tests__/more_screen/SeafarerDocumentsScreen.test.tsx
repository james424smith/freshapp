import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import SeafarerDocumentsScreen from "../../more_screens/SeafarerDocumentsScreen";
import seafarerDocuments from "../../../../__mocks__/fake-data/seafarerDocuments.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("SeafarerDocumentsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render SeafarerDocumentsScreen when isLoadingNew is false ", () => {
    const mockedState = {
      seafarerDocuments: {
        seafarerDocuments,
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("category-button-1"));

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SeafarerDocumentsScreen when categories is empty ", () => {
    const mockedState = {
      seafarerDocuments: {
        seafarerDocuments: { ...seafarerDocuments, categories: [] },
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SeafarerDocumentsScreen when loader is true ", () => {
    const mockedState = {
      seafarerDocuments: {
        seafarerDocuments,
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
});
