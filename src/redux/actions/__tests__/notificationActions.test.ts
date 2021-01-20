import * as actions from "../notificationsActions";
import {
  GET_NOTIFICATIONS_DETAILS,
  SET_REFRESHING_NOTIFICATIONS_DETAILS,
  GET_NOTIFICATIONS_DETAILS_FAIL,
  SEND_NOTIFICATIONS_DETAILS_FAIL,
  SEND_NOTIFICATIONS_DETAILS,
  SET_RING_BELL,
  SET_RING_BELL_SUCCESS,
  SET_RING_BELL_FAIL,
} from "../../constants/";

describe("test action for notifications", () => {
  it("should create an action to get notifications", () => {
    const expectedAction = {
      type: GET_NOTIFICATIONS_DETAILS,
    };

    expect(actions.getNotificationsDetails()).toEqual(expectedAction);
  });

  it("should create an action to refresh notifications details", () => {
    const expectedAction = {
      type: SET_REFRESHING_NOTIFICATIONS_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingNotificationsDetails(true)).toEqual(
      expectedAction
    );
  });
  it("should create an action to getNotificationsDetailsFailed", () => {
    const expectedAction = {
      type: GET_NOTIFICATIONS_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getNotificationsDetailsFailed({})).toEqual(expectedAction);
  });

  it("should create an action to sendNotificationsDetailsFailed", () => {
    const expectedAction = {
      type: SEND_NOTIFICATIONS_DETAILS_FAIL,
      error: {},
    };

    expect(actions.sendNotificationsDetailsFailed({})).toEqual(expectedAction);
  });
  it("should create an action to sendNotificationsDetails", () => {
    const expectedAction = {
      type: SEND_NOTIFICATIONS_DETAILS,
      payload: {
        notificationId: "1",
        notificationRead: true,
      },
    };

    expect(actions.sendNotificationsDetails(expectedAction.payload)).toEqual(
      expectedAction
    );
  });
  it("should create an action to setShouldRingBell", () => {
    const expectedAction = {
      type: SET_RING_BELL,
      payload: { shouldRing: true },
    };

    expect(
      actions.setShouldRingBell(expectedAction.payload.shouldRing)
    ).toEqual(expectedAction);
  });
  it("should create an action to setShouldRingBellSuccess", () => {
    const expectedAction = {
      type: SET_RING_BELL_SUCCESS,
      payload: true,
    };

    expect(actions.setShouldRingBellSuccess(expectedAction.payload)).toEqual(
      expectedAction
    );
  });
  it("should create an action to setShouldRingBellFailed", () => {
    const expectedAction = {
      type: SET_RING_BELL_FAIL,
      error: {},
    };

    expect(actions.setShouldRingBellFailed({})).toEqual(expectedAction);
  });
});
