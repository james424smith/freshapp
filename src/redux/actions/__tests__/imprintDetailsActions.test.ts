import * as actions from "../imprintDetailsActions";
import {
  GET_IMPRINT_DETAILS,
  GET_IMPRINT_DETAILS_SUCCESS,
  GET_IMPRINT_DETAILS_FAIL,
} from "../../constants";
import getImprintDetails from "../../../api/imprintDetailsApi";

describe("test action imprint", () => {
  it("should create an action to get imprint details", () => {
    const expectedAction = {
      type: GET_IMPRINT_DETAILS,
    };

    expect(actions.getImprintDetails()).toEqual(expectedAction);
  });

  it("should create an action to get imprint details when it succeeds", async () => {
    const imprintData = await getImprintDetails();
    const expectedAction = {
      type: GET_IMPRINT_DETAILS_SUCCESS,
      payload: imprintData.json(),
    };

    expect(actions.getImprintDetailsSuccess(imprintData.json())).toEqual(
      expectedAction
    );
  });

  it("should create an action to get imprint details when it failed", () => {
    const expectedAction = {
      type: GET_IMPRINT_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getImprintDetailsFailed({})).toEqual(expectedAction);
  });
});
