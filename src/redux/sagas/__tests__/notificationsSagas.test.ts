import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getNotificationsDetails,
  getNotificationsDetailsFailed,
  getNotificationsDetailsSuccess,
  sendNotificationsDetailsFailed,
  sendNotificationsDetailsSuccess,
  setShouldRingBellFailed,
  setShouldRingBellSuccess,
} from "../../actions";
import * as functions from "../notificationsSagas";
import getNotDetails from "../../../api/notificationsApi";
import * as apiRequest from "../../../common/request";
import { ReadNotification } from "../../../interfaces";

describe("Test Notifications Sagas", () => {
  it("should return success when calling getNotificationsDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getNotDetails());

    const res = await functions.getNotificationsDetailsRequest();

    expect(res).toEqual((await getNotDetails()).json());

    spy.mockRestore();
  });
  it("should return success when calling sendNotificationsDetailsFn", async () => {
    const apiRes = { json: () => ({ code: 201 }) };
    const spy = jest.spyOn(apiRequest, "default").mockResolvedValue(apiRes);

    const res = await functions.sendNotificationsDetailsRequest(
      {} as ReadNotification
    );

    expect(res).toEqual(apiRes.json());

    spy.mockRestore();
  });

  it("should return data from getNotifications API and fail", async () => {
    const generator = functions.getNotificationsDetailsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getNotificationsDetailsFailed({ error: "Some error" }))
    );
  });

  it("should return data from sendNotifictions API and fail", async () => {
    const generator = functions.sendNotificationsDetailsFn({
      type: "",
      payload: {} as ReadNotification,
    });
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(sendNotificationsDetailsFailed({ error: "Some error" }))
    );
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([
        fork(functions.watchGetNotificationsDetails),
        fork(functions.watchSetNotificationsDetails),
        fork(functions.watchSetShouldRingBell),
      ])
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action GET_NOTIFICATIONS_DETAILS", () => {
    const generator = functions.watchGetNotificationsDetails();
    expect(generator.next().value).toEqual(
      takeEvery(
        "GET_NOTIFICATIONS_DETAILS",
        functions.getNotificationsDetailsFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Notifications API", async () => {
    const notificationData = await getNotDetails();

    const generator = functions.getNotificationsDetailsFn();
    generator.next();

    expect(generator.next(notificationData.json()).value).toEqual(
      put(getNotificationsDetailsSuccess(notificationData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action SEND_NOTIFICATIONS_DETAILS", () => {
    const generator = functions.watchSetNotificationsDetails();
    expect(generator.next().value).toEqual(
      takeEvery(
        "SEND_NOTIFICATIONS_DETAILS",
        functions.sendNotificationsDetailsFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action SET_RING_BELL", () => {
    const generator = functions.watchSetShouldRingBell();
    expect(generator.next().value).toEqual(
      takeEvery("SET_RING_BELL", functions.setShouldRingBellFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should send correct value when calling setShouldRingBellFn", async () => {
    const generator = functions.setShouldRingBellFn({
      type: "",
      payload: { shouldRing: true },
    });

    expect(generator.next().value).toEqual(put(setShouldRingBellSuccess(true)));
    expect(generator.next().done).toBeTruthy();
  });
  it("should send error value when calling setShouldRingBellFn fails", async () => {
    const generator = functions.setShouldRingBellFn({
      type: "",
      payload: { shouldRing: true },
    });
    expect(generator.next()).toBeTruthy();
    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(setShouldRingBellFailed({ error: "Some error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should send data back to Notifications API", async () => {
    const payload = (await getNotDetails()).json();

    const generator = functions.sendNotificationsDetailsFn({
      type: "",
      payload,
    });
    generator.next();

    expect(generator.next(payload).value).toEqual(
      put(sendNotificationsDetailsSuccess())
    );
    expect(generator.next(payload).value).toEqual(
      put(getNotificationsDetails())
    );
    expect(generator.next().done).toBeTruthy();
  });
});
