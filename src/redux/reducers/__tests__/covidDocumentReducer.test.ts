import reducer, { defaultState } from "../covidDocumentReducer";
import {
  CLEAR_ALL_STATE,
  GET_COVID_DOCUMENT_FAIL,
  GET_COVID_DOCUMENT_SUCCESS,
  SET_IS_LOADING_COVID,
} from "../../constants";

describe("Test covid document Reducer", () => {
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
    const mockContactDetails = "1234";

    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_COVID_DOCUMENT_SUCCESS,
          payload: mockContactDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      covidDocument: mockContactDetails,
    });
  });

  it("should handle GET_CONTACT_DETAILS_FAIL action", () => {
    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_COVID_DOCUMENT_FAIL,
          error: {},
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
    });
  });

  it("should handle SET_IS_LOADING_COVID action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_LOADING_COVID,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
