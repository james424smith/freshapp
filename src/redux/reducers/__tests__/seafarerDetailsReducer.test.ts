import reducer, { defaultState } from "../seafarerDetailsReducer";
import {
  CLEAR_ALL_STATE,
  GET_ALL_SEAFARER_DETAILS_FAIL,
  GET_ALL_SEAFARER_DETAILS_SUCCESS,
  SET_IS_LOADING_DATA,
  SET_REFRESHING_SEAFARER_DETAILS,
} from "../../constants";
import getAllSeafarerDetails from "../../../api/seafarerDetailsApi";
import getSeafarerBadge from "../../../api/seafarerBadgesApi";

describe("Test Seafarer details Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(reducer({ loader: true }, { type: CLEAR_ALL_STATE })).toEqual({
      ...defaultState,
    }));

  it("should handle GET_ALL_SEAFARER_DETAILS_SUCCESS action", () => {
    const testSeafarerDetails = getAllSeafarerDetails();
    const testSeafarerBadge = getSeafarerBadge();

    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_ALL_SEAFARER_DETAILS_SUCCESS,
          payload: {
            seafarerDetails: testSeafarerDetails,
            seafarerBadgesDetails: testSeafarerBadge,
          },
        }
      )
    ).toEqual({
      loader: false,
      seafarerDetails: testSeafarerDetails,
      seafarerBadgesDetails: testSeafarerBadge,
    });
  });

  it("should handle GET_ALL_SEAFARER_DETAILS_FAIL action", async () => {
    const testSeafarerDetails = (await getAllSeafarerDetails()).json();
    const testSeafarerBadge = (await getSeafarerBadge()).json();

    expect(
      reducer(
        {
          ...defaultState,
          loader: true,
          seafarerDetails: testSeafarerDetails,
          seafarerBadgesDetails: testSeafarerBadge,
        },
        {
          type: GET_ALL_SEAFARER_DETAILS_FAIL,
          payload: { error: {} },
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      seafarerDetails: testSeafarerDetails,
      seafarerBadgesDetails: testSeafarerBadge,
    });
  });

  it("should handle SET_REFRESHING_SEAFARER_DETAILS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_SEAFARER_DETAILS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });

  it("should handle SET_IS_LOADING_DATA action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_LOADING_DATA,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
