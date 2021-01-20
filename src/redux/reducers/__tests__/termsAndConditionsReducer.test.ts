import reducer, { defaultState } from "../termsAndConditionsReducer";
import {
  CLEAR_ALL_STATE,
  GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS,
} from "../../constants";
import getTermsAndConditions from "../../../api/termsAndConditionsApi";

describe("Test terms and conditions Reducer", () => {
  it("should return the current state", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS action", () => {
    const mockDocument = getTermsAndConditions();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS,
          payload: mockDocument,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      termsAndConditionsDetails: mockDocument,
    });
  });
});
