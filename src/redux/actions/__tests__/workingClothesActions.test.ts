import * as actions from "../workingClothesActions";
import api from "../../../api/workingClothesApi";
import {
  GET_WORKING_CLOTHES_DETAILS,
  GET_WORKING_CLOTHES_DETAILS_FAIL,
  GET_WORKING_CLOTHES_DETAILS_SUCCESS,
  SET_REFRESHING_WORKING_CLOTHES_DETAILS,
} from "../../constants/";

describe("test action working clothes", () => {
  it("should create an action to get working clothes details", () => {
    const expectedAction = {
      type: GET_WORKING_CLOTHES_DETAILS,
    };

    expect(actions.getWorkingClothesDetails()).toEqual(expectedAction);
  });
  it("should create an action for GET_WORKING_CLOTHES_DETAILS_FAIL", () => {
    const expectedAction = {
      type: GET_WORKING_CLOTHES_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getWorkingClothesDetailsFailed({})).toEqual(expectedAction);
  });
  it("should create an action  for GET_WORKING_CLOTHES_DETAILS_SUCCESS", async () => {
    const data = (await api()).json();
    const expectedAction = {
      type: GET_WORKING_CLOTHES_DETAILS_SUCCESS,
      payload: data,
    };

    expect(actions.getWorkingClothesDetailsSuccess(data)).toEqual(
      expectedAction
    );
  });
  it("should create an action  for SET_REFRESHING_WORKING_CLOTHES_DETAILS", () => {
    const expectedAction = {
      type: SET_REFRESHING_WORKING_CLOTHES_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingWorkingClothesDetails(true)).toEqual(
      expectedAction
    );
  });
});
