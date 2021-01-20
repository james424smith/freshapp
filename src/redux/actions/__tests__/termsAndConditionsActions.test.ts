import * as actions from "../termsAndConditionsActions";

import {
  GET_TERMS_AND_CONDITIONS_DETAILS,
  GET_TERMS_AND_CONDITIONS_DETAILS_FAIL,
} from "../../constants";

describe("test action terms and conditions", () => {
  it("should create an action to get terms and conditions details", () => {
    const expectedAction = {
      type: GET_TERMS_AND_CONDITIONS_DETAILS,
    };

    expect(actions.getTermsAndConditionsDetails()).toEqual(expectedAction);
  });
  it("should create an action to getTermsAndConditionsDetailsFailed", () => {
    const expectedAction = {
      type: GET_TERMS_AND_CONDITIONS_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getTermsAndConditionsDetailsFailed({})).toEqual(
      expectedAction
    );
  });
});
