import * as actions from "../flightsDetailsActions";
import {
  GET_FLIGHTS_DETAILS,
  SET_REFRESHING_FLIGHT_DETAILS,
  GET_FLIGHTS_DETAILS_FAIL,
} from "../../constants";

describe("test action flights", () => {
  it("should create an action to get flights details", () => {
    const expectedAction = {
      type: GET_FLIGHTS_DETAILS,
    };

    expect(actions.getFlightsDetails()).toEqual(expectedAction);
  });

  it("should create an action to update refreshing status of flights details", () => {
    const expectedAction = {
      type: SET_REFRESHING_FLIGHT_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingFlightDetails(true)).toEqual(expectedAction);
  });
  it("should create an action to getFlightsDetailsFailed", () => {
    const expectedAction = {
      type: GET_FLIGHTS_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getFlightsDetailsFailed({})).toEqual(expectedAction);
  });
});
