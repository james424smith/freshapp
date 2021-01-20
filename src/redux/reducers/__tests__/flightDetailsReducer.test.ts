import reducer, { defaultState } from "../flightDetailsReducer";
import {
  CLEAR_ALL_STATE,
  GET_FLIGHTS_DETAILS_SUCCESS,
  GET_FLIGHTS_DETAILS_FAIL,
  SET_REFRESHING_FLIGHT_DETAILS,
} from "../../constants";
import getFlightDetails from "../../../api/flightDetailsApi";

describe("Test Flight Details Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle SET_REFRESHING_FLIGHT_DETAILS type of action", () =>
    expect(
      reducer(
        { ...defaultState },
        { type: SET_REFRESHING_FLIGHT_DETAILS, payload: true }
      )
    ).toEqual({ ...defaultState, loader: true }));

  it("should handle GET_FLIGHTS_DETAILS_SUCCESS action", () => {
    const mockFlightDetails = getFlightDetails();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_FLIGHTS_DETAILS_SUCCESS,
          payload: mockFlightDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      flights: mockFlightDetails,
    });
  });

  it("should handle GET_FLIGHTS_DETAILS_FAIL action", async () => {
    const mockFlightDetails = (await getFlightDetails()).json();

    expect(
      reducer(
        { ...defaultState, loader: true, flights: mockFlightDetails },
        {
          type: GET_FLIGHTS_DETAILS_FAIL,
          payload: mockFlightDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      flights: mockFlightDetails,
    });
  });
});
