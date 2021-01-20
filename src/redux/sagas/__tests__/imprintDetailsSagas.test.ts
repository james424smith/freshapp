import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getImprintDetailsFailed,
  getImprintDetailsSuccess,
} from "../../actions";
import * as functions from "../imprintDetailsSagas";
import getImprintDetails from "../../../api/imprintDetailsApi";
import * as apiRequest from "../../../common/request";

describe("Test imprint sagas", () => {
  it("should dispatch action GET_IMPRINT_DETAILS", () => {
    const generator = functions.watchGetImprintDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_IMPRINT_DETAILS", functions.getImprintDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getImprintDetails", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getImprintDetails());

    const res = await functions.getImprintDetailsRequest();

    expect(res).toEqual((await getImprintDetails()).json());

    spy.mockRestore();
  });

  it("should return data from imprint details API", async () => {
    const imprintData = await getImprintDetails();

    const generator = functions.getImprintDetailsFn();
    generator.next();

    expect(generator.next(imprintData.json()).value).toEqual(
      put(getImprintDetailsSuccess(imprintData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Imotine API and fail", async () => {
    const generator = functions.getImprintDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getImprintDetailsFailed({ error: "Some error" }))
    );
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetImprintDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
