import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getPrivacyPolicyDetailsFailed,
  getPrivacyPolicyDetailsSuccess,
} from "../../actions";
import * as functions from "../privacyPolicySagas";
import getPrivacyPolicy from "../../../api/privacyPolicyApi";
import * as apiRequest from "../../../common/request";

describe("Test Privacy Policy Sagas", () => {
  it("should dispatch action GET_PRIVACY_POLICY_DETAILS", () => {
    const generator = functions.watchGetPrivacyPolicyDetails();
    expect(generator.next().value).toEqual(
      takeEvery(
        "GET_PRIVACY_POLICY_DETAILS",
        functions.getPrivacyPolicyDetailsFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getPrivacyPolicyDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getPrivacyPolicy());

    const res = await functions.getPrivacyPolicyDetailsRequest();

    expect(res).toEqual((await getPrivacyPolicy()).json());

    spy.mockRestore();
  });

  it("should return data from privacy policy API", async () => {
    const privacyPolicyData = await getPrivacyPolicy();

    const generator = functions.getPrivacyPolicyDetailsFn();
    generator.next();

    expect(generator.next(privacyPolicyData.json()).value).toEqual(
      put(getPrivacyPolicyDetailsSuccess(privacyPolicyData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Private policy API and fail", async () => {
    const generator = functions.getPrivacyPolicyDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getPrivacyPolicyDetailsFailed({ error: "Some error" }))
    );
  });
  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetPrivacyPolicyDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
