import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getSeaServiceDetailsFailed,
  getSeaServiceDetailsSuccess,
} from "../../actions";
import * as functions from "../seaServiceDetailsSagas";
import getSeaServiceDetails from "../../../api/seaServiceApi";
import * as apiRequest from "../../../common/request";

describe("Test Sea Service Sagas", () => {
  it("should dispatch action GET_SEA_SERVICE_DETAILS", () => {
    const generator = functions.watchGetSeaServiceDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_SEA_SERVICE_DETAILS", functions.getSeaServiceDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getSeaServiceDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getSeaServiceDetails());

    const res = await functions.getSeaServiceDetailsRequest();

    expect(res).toEqual((await getSeaServiceDetails()).json());

    spy.mockRestore();
  });

  it("should return data from Sea service details API", async () => {
    const seaServiceData = (await getSeaServiceDetails()).json();

    const generator = functions.getSeaServiceDetailsFn();
    generator.next();

    expect(generator.next(seaServiceData).value).toEqual(
      put(getSeaServiceDetailsSuccess(seaServiceData))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should call the expected action when getSeaServiceDetailsFn throws an error ", async () => {
    const generator = functions.getSeaServiceDetailsFn();
    generator.next();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getSeaServiceDetailsFailed({ error: "Some error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetSeaServiceDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
