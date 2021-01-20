import {
  GET_NOTIFICATIONS_DETAILS,
  GET_NOTIFICATIONS_DETAILS_SUCCESS,
  GET_NOTIFICATIONS_DETAILS_FAIL,
  SEND_NOTIFICATIONS_DETAILS,
  SEND_NOTIFICATIONS_DETAILS_SUCCESS,
  SEND_NOTIFICATIONS_DETAILS_FAIL,
  SET_RING_BELL,
  SET_RING_BELL_SUCCESS,
  SET_RING_BELL_FAIL,
  SET_REFRESHING_NOTIFICATIONS_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  Notification,
  ReadNotification,
} from "../../interfaces/";

export function getNotificationsDetails(): InitialisedSagaCall {
  return { type: GET_NOTIFICATIONS_DETAILS };
}

export const getNotificationsDetailsSuccess = (
  notificationsDetails: Notification
): SuccessAction<Notification> => ({
  type: GET_NOTIFICATIONS_DETAILS_SUCCESS,
  payload: notificationsDetails,
});

export const setRefreshingNotificationsDetails = (
  isLoading: boolean
): SuccessAction<boolean> => ({
  type: SET_REFRESHING_NOTIFICATIONS_DETAILS,
  payload: isLoading,
});

export const getNotificationsDetailsFailed = (error: any): FailedAction => ({
  type: GET_NOTIFICATIONS_DETAILS_FAIL,
  error,
});

export function sendNotificationsDetails(
  payload: ReadNotification
): InitialisedSagaCall {
  return { type: SEND_NOTIFICATIONS_DETAILS, payload };
}

export const sendNotificationsDetailsSuccess = (): InitialisedSagaCall => ({
  type: SEND_NOTIFICATIONS_DETAILS_SUCCESS,
});

export const sendNotificationsDetailsFailed = (error: any): FailedAction => ({
  type: SEND_NOTIFICATIONS_DETAILS_FAIL,
  error,
});

export function setShouldRingBell(shouldRing: boolean): InitialisedSagaCall {
  return {
    type: SET_RING_BELL,
    payload: { shouldRing: shouldRing },
  };
}

export const setShouldRingBellSuccess = (
  shouldRing: boolean
): SuccessAction<any> => ({
  type: SET_RING_BELL_SUCCESS,
  payload: shouldRing,
});

export const setShouldRingBellFailed = (error: any): FailedAction => ({
  type: SET_RING_BELL_FAIL,
  error,
});
