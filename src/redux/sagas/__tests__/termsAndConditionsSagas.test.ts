import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getTermsAndConditionsDetailsFailed,
  getTermsAndConditionsDetailsSuccess,
} from "../../actions";
import * as functions from "../termsAndConditionsSagas";
import getTermsAndConditions from "../../../api/termsAndConditionsApi";
import * as apiRequest from "../../../common/request";

describe("Test Terms&Conditions sagas", () => {
  it("should dispatch action GET_TERMS_AND_CONDITIONS_DETAILS", () => {
    const generator = functions.watchGetTermsAndConditionsDetails();
    expect(generator.next().value).toEqual(
      takeEvery(
        "GET_TERMS_AND_CONDITIONS_DETAILS",
        functions.getTermsAndConditionsDetailsFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getSeaServiceDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getTermsAndConditions());

    const res = await functions.getTermsAndConditionsDetailsRequest();

    expect(res).toEqual((await getTermsAndConditions()).json());

    spy.mockRestore();
  });

  it("should return data from Terms&Conditions details API", async () => {
    const termsData = (await getTermsAndConditions()).json();

    const generator = functions.getTermsAndConditionsDetailsFn();
    generator.next();

    expect(generator.next(termsData).value).toEqual(
      put(getTermsAndConditionsDetailsSuccess(termsData))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should call the expected action when getTermsAndConditionsDetailsFn throws an error ", async () => {
    const generator = functions.getTermsAndConditionsDetailsFn();
    generator.next();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getTermsAndConditionsDetailsFailed({ error: "Some error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetTermsAndConditionsDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
