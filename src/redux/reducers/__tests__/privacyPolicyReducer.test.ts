import reducer, { defaultState } from "../privacyPolicyReducer";
import {
  CLEAR_ALL_STATE,
  GET_PRIVACY_POLICY_DETAILS_SUCCESS,
} from "../../constants";
import getPrivacyPolicy from "../../../api/privacyPolicyApi";

describe("Test privacy policy Reducer", () => {
  it("should return the current state", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_PRIVACY_POLICY_DETAILS_SUCCESS action", async () => {
    const mockDocument = (await getPrivacyPolicy()).json();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_PRIVACY_POLICY_DETAILS_SUCCESS,
          payload: mockDocument,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      privacyPolicyDetails: mockDocument,
    });
  });
});
