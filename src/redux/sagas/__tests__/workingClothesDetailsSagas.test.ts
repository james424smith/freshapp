import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getWorkingClothesDetailsFailed,
  getWorkingClothesDetailsSuccess,
} from "../../actions";
import * as functions from "../workingClothesDetailsSagas";
import getWorkingClothesDetails from "../../../api/workingClothesApi";
import * as apiRequest from "../../../common/request";

describe("Test sagas for working clothes", () => {
  it("should dispatch action GET_WORKING_CLOTHES_DETAILS", () => {
    const generator = functions.watchGetWorkingClothesDetails();
    expect(generator.next().value).toEqual(
      takeEvery(
        "GET_WORKING_CLOTHES_DETAILS",
        functions.getWorkingClothesDetailsFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getWorkingClothesDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getWorkingClothesDetails());

    const res = await functions.getWorkingClothesDetailsRequest();

    expect(res).toEqual((await getWorkingClothesDetails()).json());

    spy.mockRestore();
  });

  it("should return data from work clothes API", async () => {
    const workingClothes = (await getWorkingClothesDetails()).json();

    const generator = functions.getWorkingClothesDetailsFn();

    // calls the private function to get the working clothes details
    expect(generator.next()).toBeTruthy();

    expect(generator.next(workingClothes).value).toEqual(
      put(getWorkingClothesDetailsSuccess(workingClothes))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should call the expected action when getWorkingClothesDetailsFailed throws an error ", async () => {
    const generator = functions.getWorkingClothesDetailsFn();
    generator.next();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getWorkingClothesDetailsFailed({ error: "Some error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetWorkingClothesDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
