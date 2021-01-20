import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getAllSeafarerDetailsFailed,
  getAllSeafarerDetailsSuccess,
  setIsLoadingData,
} from "../../actions";
import * as functions from "../seafarerDetailsSagas";
import getAllSeafarerDetails from "../../../api/seafarerDetailsApi";
import getSeafarerBadge from "../../../api/seafarerBadgesApi";
import * as apiRequest from "../../../common/request";

describe("Test Seafarer Details sagas", () => {
  it("should dispatch action GET_ALL_SEAFARER_DETAILS", () => {
    const generator = functions.watchGetSeafarerDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_ALL_SEAFARER_DETAILS", functions.getAllSeafarerDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Seafarer Details API", async () => {
    const seafarerDetailsData = await getAllSeafarerDetails();
    const seafarerBadges = await getSeafarerBadge();

    const generator = functions.getAllSeafarerDetailsFn();

    // calls the private function to get the Seafarer details
    expect(generator.next()).toBeTruthy();
    expect(generator.next(put(setIsLoadingData(true)))).toBeTruthy();
    //  calls the private function to get the badges of the seafarers
    expect(generator.next(seafarerDetailsData.json())).toBeTruthy();

    expect(generator.next(seafarerBadges.json()).value).toEqual(
      put(
        getAllSeafarerDetailsSuccess(
          seafarerDetailsData.json(),
          seafarerBadges.json()
        )
      )
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should call the failed action when getAllSeafarerDetailsFn throws error ", async () => {
    const generator = functions.getAllSeafarerDetailsFn();

    // calls the private function to get the Seafarer details
    expect(generator.next()).toBeTruthy();
    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getAllSeafarerDetailsFailed({ error: "Some error" }))
    );
  });

  it("should return correct data when calling getAllSeafarerDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getAllSeafarerDetails());

    const res = await functions.getAllSeafarerDetailsRequest();
    expect(res).toEqual((await getAllSeafarerDetails()).json());

    spy.mockRestore();
  });

  it("should return correct data when calling getSeafarerBadgesDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getSeafarerBadge());

    const res = await functions.getSeafarerBadgesDetailsRequest();
    expect(res).toEqual((await getSeafarerBadge()).json());

    spy.mockRestore();
  });

  it("should return cempty array when calling getSeafarerBadge and status is 404", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockRejectedValue({ status: 404 });

    const res = await functions.getSeafarerBadgesDetailsRequest();
    expect(res).toEqual([]);

    spy.mockRestore();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetSeafarerDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
