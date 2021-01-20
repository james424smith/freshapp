import reducer, { defaultState } from "../imprintDetailsReducer";
import { CLEAR_ALL_STATE, GET_IMPRINT_DETAILS_SUCCESS } from "../../constants";
import getImprintDetails from "../../../api/imprintDetailsApi";

describe("Test Imprint Details Reducer", () => {
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

  it("should handle GET_IMPRINT_DETAILS_SUCCESS action", () => {
    const mockImprintDetails = getImprintDetails();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_IMPRINT_DETAILS_SUCCESS,
          payload: mockImprintDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      imprintDetails: mockImprintDetails,
    });
  });
});
