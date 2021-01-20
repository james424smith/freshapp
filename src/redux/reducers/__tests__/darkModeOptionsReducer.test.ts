import reducer, { defaultState } from "../darkModeOptionsReducer";
import { CLEAR_ALL_STATE, SET_DARK_MODE_OPTIONS } from "../../constants";

describe("Test dark mode options Reducer", () => {
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

  it("should handle SET_DARK_MODE_OPTIONS action", () => {
    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: SET_DARK_MODE_OPTIONS,
          payload: "dark",
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      darkModeOptionsValue: "dark",
    });
  });
});
