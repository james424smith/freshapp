import reducer, { defaultState } from "../contactDetailsReducer";
import {
  CLEAR_ALL_STATE,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  SET_REFRESHING_CONTACT_DETAILS,
} from "../../constants";
import getContactDetails from "../../../api/contactApi";

describe("Test contact details Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer(defaultState, { type: "blah" })).toEqual({
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

  it("should handle GET_CONTACT_DETAILS_SUCCESS action", () => {
    const mockContactDetails = getContactDetails();

    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_CONTACT_DETAILS_SUCCESS,
          payload: mockContactDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      contactDetails: mockContactDetails,
    });
  });

  it("should handle GET_CONTACT_DETAILS_FAIL action", () => {
    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_CONTACT_DETAILS_FAIL,
          error: {},
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
    });
  });

  it("should handle SET_REFRESHING_CONTACT_DETAILS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_CONTACT_DETAILS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
