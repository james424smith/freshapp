import * as actions from "../seafarerDetailsActions";
import seafarer from "../../../api/seafarerDetailsApi";
import badges from "../../../api/seafarerBadgesApi";
import {
  GET_ALL_SEAFARER_DETAILS,
  GET_ALL_SEAFARER_DETAILS_SUCCESS,
  GET_ALL_SEAFARER_DETAILS_FAIL,
  SET_REFRESHING_SEAFARER_DETAILS,
} from "../../constants";

describe("test action seafarer details", () => {
  it("should create an action for getAllSeafarerDetailsSuccess", async () => {
    const seafarerDetails = (await seafarer()).json();
    const seafarerBadgesDetails = (await badges()).json();
    const expectedAction = {
      type: GET_ALL_SEAFARER_DETAILS_SUCCESS,
      payload: { seafarerDetails, seafarerBadgesDetails },
    };
    expect(
      actions.getAllSeafarerDetailsSuccess(
        seafarerDetails,
        seafarerBadgesDetails
      )
    ).toEqual(expectedAction);
  });
  it("should create an action for getAllSeafarerDetailsFailed", () => {
    const expectedAction = {
      type: GET_ALL_SEAFARER_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getAllSeafarerDetailsFailed({})).toEqual(expectedAction);
  });
  it("should create an action for ", () => {
    const expectedAction = {
      type: GET_ALL_SEAFARER_DETAILS,
    };

    expect(actions.getAllSeafarerDetails()).toEqual(expectedAction);
  });
  it("should create an action for setRefreshingSeafarerDetails", () => {
    const expectedAction = {
      type: SET_REFRESHING_SEAFARER_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingSeafarerDetails(true)).toEqual(expectedAction);
  });
});
