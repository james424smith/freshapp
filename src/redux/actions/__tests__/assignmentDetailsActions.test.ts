import * as actions from "../assignmentDetailsActions";
import {
  GET_ASSIGNMENT_DETAILS,
  SET_REFRESHING_ASSIGNMENT_DETAILS,
  GET_ASSIGNMENT_DETAILS_FAIL,
} from "../../constants";

describe("test action assignment", () => {
  it("should create an action to get assignment details", () => {
    const expectedAction = {
      type: GET_ASSIGNMENT_DETAILS,
    };

    expect(actions.getAssignmentDetails()).toEqual(expectedAction);
  });

  it("should create an action to update refreshing status of assignment details", () => {
    const expectedAction = {
      type: SET_REFRESHING_ASSIGNMENT_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingAssignmentDetails(true)).toEqual(
      expectedAction
    );
  });
  it("should create an action to getAssignmentDetailsFailed", () => {
    const expectedAction = {
      type: GET_ASSIGNMENT_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getAssignmentDetailsFailed({})).toEqual(expectedAction);
  });
});
