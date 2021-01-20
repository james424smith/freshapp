import * as actions from "../contactDetailsActions";
import {
  GET_CONTACT_DETAILS,
  SET_REFRESHING_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_FAIL,
} from "../../constants/index";

describe("test action contact details", () => {
  it("should create an action to get contact details", () => {
    const expectedAction = {
      type: GET_CONTACT_DETAILS,
    };

    expect(actions.getContactDetails()).toEqual(expectedAction);
  });
  it("should create an action to set refreshing contactDetails", () => {
    const isLoading = false;
    const expectedAction = {
      type: SET_REFRESHING_CONTACT_DETAILS,
      payload: isLoading,
    };

    expect(actions.setRefreshingContactDetails(isLoading)).toEqual(
      expectedAction
    );
  });
  it("should create an action to getContactDetailsFailed", () => {
    const expectedAction = {
      type: GET_CONTACT_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getContactDetailsFailed({})).toEqual(expectedAction);
  });
});
