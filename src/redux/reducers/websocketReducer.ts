import {
  CLEAR_ALL_STATE,
  SEND_EVENT,
  GET_DIRECT_MESSAGE,
  SET_MESSAGE_HISTORY,
  SET_WHO_IS_AROUND,
  SET_INITIAL_HISTORY,
  SET_CHAT_USERS,
  SET_CONVERSATION,
  SET_IS_ONLINE_CHAT,
  SET_PROFILE_DETAILS,
  CLEAR_SENT_MESSAGE,
  SET_NEW_CHAT_NOTIFICATION,
  SET_REFRESHING_HISTORY,
} from "../constants/";
import {
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
  WebsocketEvent,
  GetNearbySeafarersPayload,
  ProfilePayload,
  GetMessagePayload,
  ChatSeafarer,
  GetHistoryPayload,
  ChatPushNotificationToSet,
} from "../../interfaces";

export interface WebsocketState {
  history: GetHistoryPayload[];
  message?: WebsocketEvent;
  whoIsAround: GetNearbySeafarersPayload;
  profile?: ProfilePayload;
  isOnline: boolean;
  onlineUntil: number;
  users: ChatSeafarer[];
  loader: boolean;
  [chatId: string]: GetMessagePayload | any;
  notificationToShow?: ChatPushNotificationToSet;
}

export const defaultState: WebsocketState = {
  history: [],
  whoIsAround: [],
  isOnline: false,
  isLoadingNewHistory: false,
  onlineUntil: 0,
  users: [],
  loader: false,
};

type SuccessReturnTypes =
  | ProfilePayload[]
  | WebsocketEvent
  | GetNearbySeafarersPayload
  | ProfilePayload
  | boolean
  | number
  | ChatSeafarer[]
  | GetMessagePayload;

export default (
  state: WebsocketState = defaultState,
  action: InitialisedSagaCall | FailedAction | SuccessAction<SuccessReturnTypes>
) => {
  switch (action.type) {
    case GET_DIRECT_MESSAGE:
      const actionToUse = action as SuccessAction<any>;
      return {
        ...state,
        loader: false,
        [actionToUse.chatId as string]: actionToUse.payload,
      };
    case SET_MESSAGE_HISTORY:
      return {
        ...state,
        loader: false,
        history: action.payload,
      };
    case SET_REFRESHING_HISTORY:
      return {
        ...state,
        isLoadingNewHistory: action.payload,
      };
    case SEND_EVENT:
      return {
        ...state,
        loader: false,
        message: action.payload,
      };
    case SET_WHO_IS_AROUND:
      return {
        ...state,
        loader: false,
        whoIsAround: action.payload,
      };
    case SET_INITIAL_HISTORY:
      return {
        ...state,
        loader: false,
        isLoadingNewHistory: false,
        history: action.payload,
      };
    case SET_CONVERSATION:
      return {
        ...state,
        loader: false,
        [action.payload.chatId]: action.payload.conversation,
      };
    case CLEAR_SENT_MESSAGE:
      return {
        ...state,
        loader: false,
        message: undefined,
      };
    case SET_PROFILE_DETAILS:
      return {
        ...state,
        loader: false,
        profile: action.payload,
      };
    case SET_IS_ONLINE_CHAT:
      return {
        ...state,
        loader: false,
        isOnline: action.payload.isOnline,
        whoIsAround: action.payload.isOnline ? state.whoIsAround : [],
        onlineUntil: action.payload.onlineUntil,
      };
    case SET_CHAT_USERS:
      return {
        ...state,
        loader: false,
        users: action.payload,
      };
    case SET_NEW_CHAT_NOTIFICATION:
      return {
        ...state,
        notificationToShow: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
