import reducer, { defaultState } from "../workingClothesReducer";
import {
  CLEAR_ALL_STATE,
  GET_WORKING_CLOTHES_DETAILS_SUCCESS,
  GET_WORKING_CLOTHES_DETAILS_FAIL,
  SET_REFRESHING_WORKING_CLOTHES_DETAILS,
} from "../../constants";

describe("Test working clothes Reducer", () => {
  it("should return the current state", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE", () =>
    expect(reducer({ ...defaultState }, { type: CLEAR_ALL_STATE })).toEqual({
      ...defaultState,
    }));

  it("should handle GET_WORKING_CLOTHES_DETAILS_SUCCESS action", () => {
    const mockData = {
      shoeSizeUk: 20,
      shoeSizeEu: 21,
      shoeSizePhl: 22,
      shoeSizeUs: 23,
      workingClothes: [
        {
          clothingId: 49,
          item: "OVERALL",
          quantity: 2,
          vesselName: "LEA AUERBACH",
          issuingAgentName: "MN UKR",
          issueDate: "08-01-2019",
        },
      ],
    };
    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_WORKING_CLOTHES_DETAILS_SUCCESS,
          payload: mockData,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      workingClothesDetails: mockData,
    });
  });

  it("should handle GET_WORKING_CLOTHES_DETAILS_FAIL action", () => {
    const mockData = {
      shoeSizeUk: 20,
      shoeSizeEu: 21,
      shoeSizePhl: 22,
      shoeSizeUs: 23,
      workingClothes: [
        {
          clothingId: 49,
          item: "OVERALL",
          quantity: 2,
          vesselName: "LEA AUERBACH",
          issuingAgentName: "MN UKR",
          issueDate: "08-01-2019",
        },
      ],
    };
    expect(
      reducer(
        { loader: true, workingClothesDetails: mockData },
        {
          type: GET_WORKING_CLOTHES_DETAILS_FAIL,
          payload: { error: {} },
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      workingClothesDetails: mockData,
    });
  });

  it("should handle SET_REFRESHING_WORKING_CLOTHES_DETAILS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_WORKING_CLOTHES_DETAILS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
