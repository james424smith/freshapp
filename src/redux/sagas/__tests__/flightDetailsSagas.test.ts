import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getFlightsDetailsFailed,
  getFlightsDetailsSuccess,
} from "../../actions";
import * as functions from "../flightDetailsSaga";
import getFlightDetails from "../../../api/flightDetailsApi";
import * as apiRequest from "../../../common/request";

describe("Test Flights Sagas", () => {
  it("should dispatch action GET_FLIGHTS_DETAILS", () => {
    const generator = functions.watchGetFlightDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_FLIGHTS_DETAILS", functions.getFlightDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getFlightDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getFlightDetails());

    const res = await functions.getFlightDetailsRequest();

    expect(res).toEqual((await getFlightDetails()).json());

    spy.mockRestore();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetFlightDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Flights API", async () => {
    const flightData = await getFlightDetails();

    const generator = functions.getFlightDetailsFn();
    expect(generator.next()).toBeTruthy();

    expect(generator.next(flightData.json()).value).toEqual(
      put(getFlightsDetailsSuccess(flightData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Flights API and fail", async () => {
    const generator = functions.getFlightDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getFlightsDetailsFailed({ error: "Some error" }))
    );
  });
});
