import * as actions from "../privacyPolicyActions";
import {
  GET_PRIVACY_POLICY_DETAILS,
  GET_PRIVACY_POLICY_DETAILS_FAIL,
} from "../../constants/";

describe("test action privacy policy", () => {
  it("should create an action to get privacy policy details", () => {
    const expectedAction = {
      type: GET_PRIVACY_POLICY_DETAILS,
    };

    expect(actions.getPrivacyPolicyDetails()).toEqual(expectedAction);
  });
  it("should create an action to setShouldRingBellFailed", () => {
    const expectedAction = {
      type: GET_PRIVACY_POLICY_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getPrivacyPolicyDetailsFailed({})).toEqual(expectedAction);
  });
});
