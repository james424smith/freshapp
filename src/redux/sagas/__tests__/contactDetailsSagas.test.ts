import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getContactDetailsFailed,
  getContactDetailsSuccess,
} from "../../actions";
import * as functions from "../contactDetailsSagas";
import getContactDetails from "../../../api/contactApi";
import * as apiRequest from "../../../common/request";

describe("Test Contact Sagas", () => {
  it("should dispatch action GET_CONTACT_DETAILS", () => {
    const generator = functions.watchGetContactDetails();
    expect(generator.next().value).toEqual(
      takeEvery("GET_CONTACT_DETAILS", functions.getContactDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getContactDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getContactDetails());

    const res = await functions.getContactDetailsRequest();

    expect(res).toEqual((await getContactDetails()).json());

    spy.mockRestore();
  });

  it("should return data from contact API", async () => {
    const contactData = await getContactDetails();

    const generator = functions.getContactDetailsFn();
    // calls the private function to get the Contact details
    expect(generator.next()).toBeTruthy();

    expect(generator.next(contactData.json()).value).toEqual(
      put(getContactDetailsSuccess(contactData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Contact API and fail", async () => {
    const generator = functions.getContactDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getContactDetailsFailed({ error: "Some error" }))
    );
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetContactDetails)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
