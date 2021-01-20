import {
  InitialisedSagaCall,
  FailedAction,
  SuccessAction,
  Notification,
} from "../../interfaces/index";
import {
  CLEAR_ALL_STATE,
  GET_NOTIFICATIONS_DETAILS_SUCCESS,
  GET_NOTIFICATIONS_DETAILS_FAIL,
  SET_RING_BELL_SUCCESS,
  SET_REFRESHING_NOTIFICATIONS_DETAILS,
} from "../constants/";

export interface NotificationState {
  notificationsDetails: Notification;
  loader: boolean;
  shouldRing: boolean;
}

export const defaultState: NotificationState = {
  notificationsDetails: { unreadCount: 0, notifications: undefined },
  loader: false,
  shouldRing: false,
};

export default (
  state: NotificationState = defaultState,
  action:
    | InitialisedSagaCall
    | SuccessAction<Notification | boolean>
    | FailedAction
) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        notificationsDetails: action.payload,
      };
    case GET_NOTIFICATIONS_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    case SET_REFRESHING_NOTIFICATIONS_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case SET_RING_BELL_SUCCESS:
      return {
        ...state,
        loader: false,
        shouldRing: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
