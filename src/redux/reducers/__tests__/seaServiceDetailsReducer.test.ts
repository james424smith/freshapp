import reducer, { defaultState } from "../seaServiceDetailsReducer";
import {
  CLEAR_ALL_STATE,
  GET_SEA_SERVICE_DETAILS_FAIL,
  GET_SEA_SERVICE_DETAILS_SUCCESS,
  SET_REFRESHING_SEA_SERVICE_DETAILS,
} from "../../constants";
import getSeaServiceDetails from "../../../api/seaServiceApi";

describe("Test Sea Service Reducer", () => {
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

  it("should handle GET_SEA_SERVICE_DETAILS_SUCCESS action", () => {
    const mockSeaService = getSeaServiceDetails();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_SEA_SERVICE_DETAILS_SUCCESS,
          payload: mockSeaService,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      seaServiceDetails: mockSeaService,
    });
  });
  it("should handle GET_SEA_SERVICE_DETAILS_FAIL action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_SEA_SERVICE_DETAILS_FAIL,
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
    });
  });

  it("should handle SET_REFRESHING_SEA_SERVICE_DETAILS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_SEA_SERVICE_DETAILS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
