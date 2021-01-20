import * as actions from "../websocketActions";
import {
  CLEAR_SENT_MESSAGE,
  SET_WEBSOCKET_DATA,
  GET_DIRECT_MESSAGE,
  SET_MESSAGE_HISTORY,
  SEND_EVENT,
  SET_INITIAL_HISTORY,
  SET_PROFILE_DETAILS,
  SET_IS_ONLINE_CHAT,
  SET_WHO_IS_AROUND,
  SET_CONVERSATION,
  SET_CHAT_USERS,
  SET_NEW_CHAT_NOTIFICATION,
  SET_REFRESHING_HISTORY,
} from "../../constants/";
import {
  WebsocketEvent,
  UPDATE_WHO_IS_AROUND,
  GetHistoryPayload,
  MessageTypes,
  ChatPushNotificationToSet,
} from "../../../interfaces";

const chatUser = { _id: "112393", name: "Some User" };
const blob = "blob";
const _id = "12345";
const text = "jfdskjkldfsjfkls";
const createdAt = 1450000000;
const onlineUntil = 1450000000;
const unreadCount = 0;
const lastMessage = "message";
const lastMessageTs = 123456;
const recipientId = "112393";
const familyName = "Some";
const firstName = "firstName";
const chatId = "112393";
const oracleId = "112393";
const location = {
  pin: {
    lat: 12345,
    lon: 1234,
  },
};

const history: GetHistoryPayload[] = [
  {
    blob,
    lastMessage,
    lastMessageTs,
    recipientId,
    familyName,
    middleName: "",
    firstName,
    unreadCount,
  },
];

describe("test actions related to web socket", () => {
  it("should create an action to set web socket", () => {
    const expectedAction = {
      type: SET_WEBSOCKET_DATA,
      event: { messageType: UPDATE_WHO_IS_AROUND, payload: {} },
    };

    expect(
      actions.setWebsocketData({
        messageType: UPDATE_WHO_IS_AROUND,
        payload: {},
      } as WebsocketEvent)
    ).toEqual(expectedAction);
  });

  it("should create an action to set a chat push notification", () => {
    const expectedAction = {
      type: SET_NEW_CHAT_NOTIFICATION,
      payload: {
        id: 1234,
      },
    };

    expect(
      actions.setPushNotificationToPop(({
        id: 1234,
      } as unknown) as ChatPushNotificationToSet)
    ).toStrictEqual(expectedAction);
  });

  it("should create an action to refresh history data", () => {
    const expectedAction = {
      type: SET_REFRESHING_HISTORY,
      payload: true,
    };

    expect(actions.setRefreshingHistoryData(true)).toStrictEqual(
      expectedAction
    );
  });

  it("should create an action to get direct message", () => {
    const payload = {
      _id,
      text,
      createdAt,
      user: chatUser,
      unread: false,
    };
    const expectedAction = {
      type: GET_DIRECT_MESSAGE,
      payload,
      chatId,
    };

    expect(actions.getDirectMessage(payload, "112393")).toEqual(expectedAction);
  });

  it("should create an action to set message history", () => {
    const expectedAction = {
      type: SET_MESSAGE_HISTORY,
      payload: history,
    };

    expect(actions.setHistoryMessage(history)).toEqual(expectedAction);
  });

  it("should create an action to send event", () => {
    const payload = {
      messageType: "getWhoIsAround" as MessageTypes,
      payload: {
        distance: 10000,
      },
    };

    const expectedAction = {
      type: SEND_EVENT,
      payload,
    };

    expect(actions.sendEvent(payload)).toEqual(expectedAction);
  });

  it("should create an action to send initial history", () => {
    const expectedAction = {
      type: SET_INITIAL_HISTORY,
      payload: history,
    };

    expect(actions.setInitialHistory(history)).toEqual(expectedAction);
  });

  it("should create an action to set my profile", () => {
    const payload = {
      blob,
      familyName,
      middleName: "",
      firstName,
      history: history,
      onlineUntil,
      oracleId,
    };
    const expectedAction = {
      type: SET_PROFILE_DETAILS,
      payload,
    };

    expect(actions.setMyProfile(payload)).toEqual(expectedAction);
  });

  it("should create an action to set that is online", () => {
    const expectedAction = {
      type: SET_IS_ONLINE_CHAT,
      payload: {
        isOnline: true,
        onlineUntil: 1234,
        seafarerId: "112393",
      },
    };

    expect(
      actions.setIsOnline({
        isOnline: true,
        onlineUntil: 1234,
        seafarerId: "112393",
      })
    ).toEqual(expectedAction);
  });

  it("should clearSentMessage be called correctly", () => {
    const expectedAction = {
      type: CLEAR_SENT_MESSAGE,
    };

    expect(actions.clearSentMessage()).toEqual(expectedAction);
  });

  it("should create an action to set who is around", () => {
    const payload = [
      {
        blob,
        familyName,
        firstName,
        middleName: "",
        history: history[0].lastMessage,
        onlineUntil,
        oracleId: "112393",
        pin: { ...location },
      },
    ];
    const expectedAction = {
      type: SET_WHO_IS_AROUND,
      payload,
    };

    expect(actions.setWhoIsAround(payload)).toEqual(expectedAction);
  });

  it("should create an action to set a conversation", () => {
    const payload = {
      chatId,
      conversation: [
        {
          _id,
          text,
          createdAt,
          user: chatUser,
          unread: false,
        },
      ],
    };
    const expectedAction = {
      type: SET_CONVERSATION,
      payload,
    };

    expect(actions.receiveConversationForChat(payload)).toEqual(expectedAction);
  });

  it("should create an action to set the chat with users", () => {
    const payload = [
      {
        blob,
        familyName,
        firstName,
        seafarerId: oracleId,
      },
    ];
    const expectedAction = {
      type: SET_CHAT_USERS,
      payload,
    };

    expect(actions.setChatUsers(payload)).toEqual(expectedAction);
  });
});
