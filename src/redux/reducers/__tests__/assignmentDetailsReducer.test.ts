import reducer, { defaultState } from "../assignmentDetailsReducer";
import {
  CLEAR_ALL_STATE,
  GET_ASSIGNMENT_DETAILS_FAIL,
  GET_ASSIGNMENT_DETAILS_SUCCESS,
  SET_REFRESHING_ASSIGNMENT_DETAILS,
} from "../../constants";
import getAssignmentDetails from "../../../api/assignmentDetailsApi";
import { SuccessAction } from "../../../interfaces";

describe("Test Assignment Details Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(
      reducer({ ...defaultState }, { type: "blah", payload: {} })
    ).toEqual({ ...defaultState }));

  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah", payload: {} })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(
      reducer(
        { ...defaultState, loader: true },
        { type: CLEAR_ALL_STATE, payload: {} }
      )
    ).toEqual({ ...defaultState }));

  it("should handle SET_REFRESHING_ASSIGNMENT_DETAILS type of action", () =>
    expect(
      reducer({ ...defaultState }, {
        type: SET_REFRESHING_ASSIGNMENT_DETAILS,
        payload: true,
      } as SuccessAction<boolean>)
    ).toEqual({ ...defaultState, loader: true }));

  it("should handle GET_ASSIGNMENT_DETAILS_SUCCESS action", async () => {
    const testAssignmentDetails = await getAssignmentDetails();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_ASSIGNMENT_DETAILS_SUCCESS,
          payload: testAssignmentDetails.json(),
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      assignmentDetails: testAssignmentDetails.json(),
    });
  });

  it("should handle GET_ASSIGNMENT_DETAILS_FAIL action", async () => {
    const testAssignmentDetails = await getAssignmentDetails();

    expect(
      reducer(
        {
          loader: true,
          assignmentDetails: testAssignmentDetails.json(),
        },
        {
          type: GET_ASSIGNMENT_DETAILS_FAIL,
          payload: testAssignmentDetails.json(),
          error: {},
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      assignmentDetails: testAssignmentDetails.json(),
    });
  });
});
