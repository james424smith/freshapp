import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import FlightsScreen from "../FlightsScreen";
import { flights } from "../../../__mocks__/fake-data/flightDetailsApi.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("FlightsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render FlightsScreen when loader is false", async () => {
    const mockedState = {
      flightDetails: {
        flights: {
          flights,
        },
        loader: false,
      },

      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <FlightsScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render FlightsScreen when loader is true", async () => {
    const mockedState = {
      flightDetails: {
        flights: {
          flights,
        },
        loader: true,
      },

      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <FlightsScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
