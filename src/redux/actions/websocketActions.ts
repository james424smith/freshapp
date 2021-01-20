import {
  ChatSeafarer,
  GetNearbySeafarersPayload,
  InitialisedSagaCall,
  ProfilePayload,
  WebsocketEvent,
  GetConversationPayload,
  GetMessagePayload,
  GetHistoryPayload,
  ReceiveStatusPayload,
  ChatPushNotificationToSet,
} from "../../interfaces";
import {
  SET_WEBSOCKET_DATA,
  GET_DIRECT_MESSAGE,
  SEND_EVENT,
  SET_MESSAGE_HISTORY,
  SET_INITIAL_HISTORY,
  SET_CONVERSATION,
  SET_IS_ONLINE_CHAT,
  SET_PROFILE_DETAILS,
  SET_WHO_IS_AROUND,
  SET_CHAT_USERS,
  CLEAR_SENT_MESSAGE,
  SET_NEW_CHAT_NOTIFICATION,
  SET_REFRESHING_HISTORY,
} from "../constants";

export function setWebsocketData(event: WebsocketEvent): InitialisedSagaCall {
  return { type: SET_WEBSOCKET_DATA, event };
}

export function setRefreshingHistoryData(reloading: boolean) {
  return {
    type: SET_REFRESHING_HISTORY,
    payload: reloading,
  };
}

export function getDirectMessage(
  message: GetMessagePayload,
  chatId: number | string
): InitialisedSagaCall {
  return { type: GET_DIRECT_MESSAGE, payload: message, chatId };
}

export function setHistoryMessage(
  history: GetHistoryPayload[]
): InitialisedSagaCall {
  return { type: SET_MESSAGE_HISTORY, payload: history };
}

export function sendEvent(event: WebsocketEvent): InitialisedSagaCall {
  return {
    type: SEND_EVENT,
    payload: event,
  };
}

export function setInitialHistory(
  history: GetHistoryPayload[]
): InitialisedSagaCall {
  return {
    type: SET_INITIAL_HISTORY,
    payload: history,
  };
}

export function setMyProfile(profile: ProfilePayload): InitialisedSagaCall {
  return {
    type: SET_PROFILE_DETAILS,
    payload: profile,
  };
}

export function setIsOnline(
  isOnline: ReceiveStatusPayload
): InitialisedSagaCall {
  return {
    type: SET_IS_ONLINE_CHAT,
    payload: isOnline,
  };
}

export function setPushNotificationToPop(
  notification?: ChatPushNotificationToSet
): InitialisedSagaCall {
  return {
    type: SET_NEW_CHAT_NOTIFICATION,
    payload: notification,
  };
}

export function clearSentMessage(): InitialisedSagaCall {
  return {
    type: CLEAR_SENT_MESSAGE,
  };
}

export function setWhoIsAround(
  whoIsAround: GetNearbySeafarersPayload
): InitialisedSagaCall {
  return {
    type: SET_WHO_IS_AROUND,
    payload: whoIsAround,
  };
}

export function receiveConversationForChat(
  payload: GetConversationPayload
): InitialisedSagaCall {
  return {
    type: SET_CONVERSATION,
    payload,
  };
}

export function setChatUsers(payload: ChatSeafarer[]): InitialisedSagaCall {
  return {
    type: SET_CHAT_USERS,
    payload,
  };
}
