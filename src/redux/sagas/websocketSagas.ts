import { all, fork, put, takeEvery, select, call } from "redux-saga/effects";
import { SET_WEBSOCKET_DATA } from "../constants";
import {
  getDirectMessage,
  setInitialHistory,
  receiveConversationForChat,
  sendEvent,
  setIsOnline,
  setHistoryMessage,
  setMyProfile,
  setWhoIsAround,
  setPushNotificationToPop,
} from "../actions";
import _ from "lodash";
import {
  GetConversationPayload,
  GetHistoryPayload,
  WebsocketEvent,
  GetMessagePayload,
  ProfilePayload,
  GetNearbySeafarersPayload,
  NearbySeafarer,
  LEFT_CONVERSATION,
  GetConversationRequestPayload,
  SET_NEW_CHAT_NOTIFICATION,
  GET_HISTORY,
  GET_CONVERSATION,
  GET_WHO_IS_AROUND,
  NEARBY_SEAFARERS,
  PROFILE,
  RECEIVE_CONVERSATION,
  RECEIVE_HISTORY,
  RECEIVE_STATUS,
  RECEIVING_MESSAGE,
  SEND_MESSAGE,
  UPDATE_WHO_IS_AROUND,
} from "../../interfaces";
import { IRootReducerType } from "../reducers";
import valueOrDefault from "../../common/valueOrDefault";

export const getCurrentChatSelector = (
  state: IRootReducerType,
  chatId: string
) => state.websocketReducer[chatId] ?? [];

export const getCurrentHistorySelector = (state: IRootReducerType) =>
  state.websocketReducer.history ?? [];

export const getCurrentUsers = (state: IRootReducerType) => {
  return state.websocketReducer.whoIsAround ?? [];
};

export function* handleGetMessage(payload: GetMessagePayload, chatId: string) {
  const currentChat = yield select(getCurrentChatSelector, chatId);
  const payloadToUse = {
    ...payload,
    _id: `${chatId}-${payload.createdAt}`,
  };
  const newState: GetMessagePayload[] = [payloadToUse, ...currentChat];
  yield put(getDirectMessage(newState as any, chatId));
}

export function* handleSetHistoryMessage(
  message: GetMessagePayload,
  chatId: string
) {
  const currentHistory: GetHistoryPayload[] = yield select(
    getCurrentHistorySelector
  );
  const currentUsers: NearbySeafarer[] = yield select(getCurrentUsers);

  const userFromHistory = currentHistory.find((e) => e.recipientId === chatId);
  const userFromWhoIsAround = currentUsers.find((e) => e.oracleId === chatId);

  const lastMessageTs =
    typeof message.createdAt !== "number"
      ? message.createdAt.getTime()
      : message.createdAt;

  const historyMessage = (
    currentMessage?: GetHistoryPayload
  ): GetHistoryPayload =>
    userFromHistory
      ? {
          blob: userFromHistory.blob,
          lastMessage: message.text,
          lastMessageTs,
          recipientId: userFromHistory.recipientId,
          familyName: userFromHistory.familyName,
          middleName: userFromHistory.middleName,
          firstName: userFromHistory.firstName,
          unreadCount: message.unread
            ? (valueOrDefault(currentMessage?.unreadCount, 0) as number) + 1
            : 0,
        }
      : {
          blob: valueOrDefault(userFromWhoIsAround?.blob, "") as string,
          lastMessage: message.text,
          lastMessageTs,
          middleName: valueOrDefault(
            userFromWhoIsAround?.middleName,
            ""
          ) as string,
          recipientId: valueOrDefault(
            userFromWhoIsAround?.oracleId,
            ""
          ) as string,
          familyName: valueOrDefault(
            userFromWhoIsAround?.familyName,
            ""
          ) as string,
          firstName: valueOrDefault(
            userFromWhoIsAround?.firstName,
            ""
          ) as string,
          unreadCount: message.unread
            ? (valueOrDefault(currentMessage?.unreadCount, 0) as number) + 1
            : 0,
        };

  const checkIfExists = _.findIndex(currentHistory, { recipientId: chatId });
  const newHistory =
    checkIfExists === -1
      ? [historyMessage(), ...currentHistory]
      : currentHistory
          .map((ch: GetHistoryPayload, i: number) =>
            i === checkIfExists ? historyMessage(ch) : ch
          )
          .sort((a, b) => b.lastMessageTs - a.lastMessageTs);
  yield put(setHistoryMessage(newHistory));
}

export function* handleMarkConversationRead(chatId: string) {
  const currentHistory: GetHistoryPayload[] = yield select(
    getCurrentHistorySelector
  );

  const historyToUpdateIndex = _.findIndex(currentHistory, {
    recipientId: chatId,
  });

  const historyToUpdate = currentHistory.map(
    (history: GetHistoryPayload, i: number) =>
      i === historyToUpdateIndex ? { ...history, unreadCount: 0 } : history
  );

  yield put(setHistoryMessage(historyToUpdate));
}

export function* handleInAppPushNotification(notification: any) {
  const id = notification.notificationId;
  const chatId = id.substring(id.indexOf("-") + 1, id.lastIndexOf("-"));
  const currentHistory: GetHistoryPayload[] = yield select(
    getCurrentHistorySelector
  );
  const currentUsers: NearbySeafarer[] = yield select(getCurrentUsers);
  const userFromWhoIsAround = currentUsers.find((e) => e.oracleId === chatId);
  const userFromHistory = currentHistory.find((e) => e.recipientId === chatId);
  if (userFromWhoIsAround || userFromHistory) {
    yield put(
      setPushNotificationToPop({
        notification: notification,
        user: valueOrDefault(
          userFromWhoIsAround,
          userFromHistory as GetHistoryPayload
        ) as NearbySeafarer,
      })
    );
  } else {
    yield put(setPushNotificationToPop());
  }
}

export function* handleSetInitialHistory(history: GetHistoryPayload[]) {
  yield put(setInitialHistory(history));
}

export function* handleReceiveConversationForChat(
  payload: GetConversationPayload
) {
  yield put(receiveConversationForChat(payload));
}

export function* handleSendMessage(event: any) {
  const payloadToSend = {
    messageType: event.messageType,
    payload: {
      text: event.payload.text.text,
      createdAt: event.payload.text.createdAt.getTime(),
      recipientId: event.payload.recipient.recipientId,
      senderId: event.payload.user._id,
    },
  };
  yield put(sendEvent(payloadToSend as any));
}

export function* chooseMessageType(res: any) {
  const event: WebsocketEvent = res.event;
  switch (event.messageType) {
    case RECEIVING_MESSAGE: {
      const payload = event.payload as GetMessagePayload;
      yield call(handleGetMessage, payload, payload.user._id);
      yield call(handleSetHistoryMessage, payload, payload.user._id);
      break;
    }
    case SEND_MESSAGE: {
      const payload = event.payload as any;
      yield call(handleGetMessage, payload.text, payload.recipient.recipientId);
      yield call(
        handleSetHistoryMessage,
        payload.text,
        payload.recipient.recipientId
      );
      yield call(handleSendMessage, event);
      break;
    }
    case RECEIVE_HISTORY: {
      console.log("GET HISTORY ACTION");
      const payload = event.payload as GetHistoryPayload[];
      yield call(handleSetInitialHistory, payload);
      break;
    }
    case SET_NEW_CHAT_NOTIFICATION: {
      console.log("NEW IN APP NOTIFICATION");
      const payload = event.payload;
      yield call(handleInAppPushNotification, payload);
      break;
    }
    case GET_CONVERSATION: {
      console.log("REQUEST CONVERSATION");
      const payload = event.payload as GetConversationRequestPayload;
      yield call(handleMarkConversationRead, payload.recipientId);
      yield put(sendEvent(event));
      break;
    }
    case LEFT_CONVERSATION: {
      console.log("LEFT CONVERSATION");
      yield put(sendEvent(event));
      break;
    }
    case GET_WHO_IS_AROUND: {
      console.log("REQUEST WHO IS AROUND");
      yield put(sendEvent(event));
      break;
    }
    case RECEIVE_CONVERSATION: {
      console.log("GET CONVERSATION");
      const payload = event.payload as GetConversationPayload;
      yield call(handleReceiveConversationForChat, payload);
      break;
    }
    case UPDATE_WHO_IS_AROUND: {
      console.log("UPDATE WHO IS AROUND");
      yield put(sendEvent(event));
      break;
    }
    case RECEIVE_STATUS: {
      console.log("STATUS RECEIVED", event);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      yield put(setIsOnline(event.payload));
      break;
    }
    case PROFILE: {
      console.log("GET PROFILE DATA");
      const payload = event.payload as ProfilePayload;
      yield put(setMyProfile(payload));
      break;
    }
    case GET_HISTORY: {
      console.log("GET History");
      yield put(sendEvent(event));
      break;
    }
    case NEARBY_SEAFARERS: {
      console.log("GET NEARBY SEAFARERS");
      const payload = event.payload as GetNearbySeafarersPayload;
      yield put(setWhoIsAround(payload));
      break;
    }
    default: {
      break;
    }
  }
}

export function* watchSetWebsocketData() {
  yield takeEvery(SET_WEBSOCKET_DATA, chooseMessageType);
}

export default function* rootSaga() {
  yield all([fork(watchSetWebsocketData)]);
}
