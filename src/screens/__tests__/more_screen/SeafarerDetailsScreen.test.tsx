import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import SeafarerDetailsScreen from "../../more_screens/SeafarerDetailsScreen";
import seafarerDetails from "../../../../__mocks__/fake-data/seafarerDetails.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("SeafarerDetailsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render SeafarerDetailsScreen when loader is false and seafarer has 10 years badge ", async () => {
    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails,
        seafarerBadgesDetails: [{ badge: "10YEARS" }],
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      getByTestId("scrollview").props.refreshControl.props.onRefresh();

      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render SeafarerDetailsScreen when loader is false and seafarer has 25 years badge ", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails,
        seafarerBadgesDetails: [{ badge: "25YEARS" }],
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      getByTestId("scrollview").props.refreshControl.props.onRefresh();
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render SeafarerDetailsScreen when loader is false and seafarer has no badge ", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails,
        seafarerBadgesDetails: undefined,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      getByTestId("scrollview").props.refreshControl.props.onRefresh();
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render SeafarerDetailsScreen when loader is true and seafarer has no badge ", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails,
        seafarerBadgesDetails: undefined,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      getByTestId("scrollview").props.refreshControl.props.onRefresh();
      try {
        expect(toJSON()).toMatchSnapshot();
      } catch (e) {
        expect(e.message).toBe("Could not find appropriate badge");
      }
    });
  });
  it("should render SeafarerDetailsScreen when loader is true and seafarer has wrong badge ", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails,
        seafarerBadgesDetails: [{ badge: "1234" }],
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    try {
      render(
        <Provider store={mockedStore(mockedState)}>
          <SeafarerDetailsScreen />
        </Provider>
      );
    } catch (e) {
      expect(e.message).toBe("Could not find appropriate badge");
    }
  });
  it("should render SeafarerDetailsScreen when loader is true and seafarer has no nextOfKin ", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { ...seafarerDetails, nextOfKin: undefined },
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    try {
      render(
        <Provider store={mockedStore(mockedState)}>
          <SeafarerDetailsScreen />
        </Provider>
      );
    } catch (e) {
      expect(e.message).toBe("Could not find appropriate badge");
    }
  });
});
