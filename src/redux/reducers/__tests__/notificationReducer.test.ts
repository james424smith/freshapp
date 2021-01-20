import reducer, { defaultState } from "../notificationsReducer";
import {
  CLEAR_ALL_STATE,
  GET_NOTIFICATIONS_DETAILS_SUCCESS,
  GET_NOTIFICATIONS_DETAILS_FAIL,
  SET_RING_BELL_SUCCESS,
  SET_REFRESHING_NOTIFICATIONS_DETAILS,
} from "../../constants";
import getNotificationsDetails from "../../../api/notificationsApi";

describe("Test Notifications Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_NOTIFICATIONS_DETAILS_SUCCESS action", () => {
    const mockNotifications = getNotificationsDetails();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_NOTIFICATIONS_DETAILS_SUCCESS,
          payload: mockNotifications,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      notificationsDetails: mockNotifications,
    });
  });

  it("should handle SET_REFRESHING_NOTIFICATIONS_DETAILS type of action", () =>
    expect(
      reducer(
        { ...defaultState },
        { type: SET_REFRESHING_NOTIFICATIONS_DETAILS, payload: true }
      )
    ).toEqual({ ...defaultState, loader: true }));

  it("should handle GET_NOTIFICATIONS_DETAILS_FAIL action", async () => {
    const mockNotifications = (await getNotificationsDetails()).json();

    expect(
      reducer(
        {
          ...defaultState,
          loader: true,
          notificationsDetails: mockNotifications,
        },
        {
          type: GET_NOTIFICATIONS_DETAILS_FAIL,
          payload: mockNotifications,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      notificationsDetails: mockNotifications,
    });
  });

  it("should handle SET_RING_BELL_SUCCESS action", () => {
    const shouldRingFlag = true;

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_RING_BELL_SUCCESS,
          payload: shouldRingFlag,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      shouldRing: shouldRingFlag,
    });
  });
});
