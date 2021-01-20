import {
  put,
  takeEvery,
  CallEffect,
  select,
  all,
  fork,
} from "redux-saga/effects";
import {
  getDirectMessage,
  receiveConversationForChat,
  sendEvent,
  setHistoryMessage,
  setInitialHistory,
  setIsOnline,
  setMyProfile,
  setPushNotificationToPop,
  setWhoIsAround,
} from "../../actions";
import * as functions from "../websocketSagas";
import {
  GET_CONVERSATION,
  LEFT_CONVERSATION,
  GET_WHO_IS_AROUND,
  NEARBY_SEAFARERS,
  PROFILE,
  RECEIVE_CONVERSATION,
  RECEIVE_HISTORY,
  RECEIVE_STATUS,
  RECEIVING_MESSAGE,
  SEND_MESSAGE,
  UPDATE_WHO_IS_AROUND,
  MessageTypes,
  ProfilePayload,
  GetHistoryPayload,
  NearbySeafarer,
  SET_NEW_CHAT_NOTIFICATION,
  WebsocketEvent,
  GET_HISTORY,
} from "../../../interfaces";
import { IRootReducerType } from "../../reducers";
import MockDate from "mockdate";

describe("Test websocket sagas", () => {
  it("should dispatch action SET_WEBSOCKET_DATA", () => {
    const generator = functions.watchSetWebsocketData();
    expect(generator.next().value).toEqual(
      takeEvery("SET_WEBSOCKET_DATA", functions.chooseMessageType)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle SEND_MESSAGE event type", () => {
    const event = {
      event: {
        messageType: SEND_MESSAGE,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
        },
      },
    };

    const generator = functions.chooseMessageType(event);

    //handleGetMessage Sagas Function
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleGetMessage")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleSetHistoryMessage")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleSendMessage")
    ).toBeTruthy();
    expect(generator.next().done).toBeTruthy();
  });

  it("handle RECEIVING_MESSAGE event type", () => {
    const event = {
      event: {
        messageType: RECEIVING_MESSAGE,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
          user: { _id: "2" },
        },
      },
    };

    const generator = functions.chooseMessageType(event);

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleGetMessage")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleSetHistoryMessage")
    ).toBeTruthy();
    expect(generator.next().done).toBeTruthy();
  });

  it("handle SET_NEW_CHAT_NOTIFICATION event type", () => {
    const payload = {
      text: "test message",
      recipient: { recipientId: "1" },
      user: { _id: "2" },
    };
    const event = {
      event: {
        messageType: SET_NEW_CHAT_NOTIFICATION,
        payload,
      },
    };

    const generator = functions.chooseMessageType(event);

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleInAppPushNotification")
    ).toBeTruthy();
    expect(generator.next().done).toBeTruthy();
  });

  it("handle event type with no matching case", () => {
    const event = {
      event: {
        messageType: "Some Types",
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next().done).toBeTruthy();
  });

  it("handle GET_HISTORY event type", () => {
    const event = {
      event: {
        messageType: GET_HISTORY,
        payload: [] as GetHistoryPayload[],
      } as WebsocketEvent,
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next().value).toEqual(put(sendEvent(event.event)));
    expect(generator.next().done).toBeTruthy();
  });

  it("handle RECEIVE_HISTORY event type", () => {
    const event = {
      event: {
        messageType: RECEIVE_HISTORY,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleSetInitialHistory")
    ).toBeTruthy();
    expect(generator.next().done).toBeTruthy();
  });

  it("handle GET_CONVERSATION event type", () => {
    const event = {
      event: {
        messageType: GET_CONVERSATION as MessageTypes,
        payload: {
          chatId: "112393",
          conversation: {
            text: "test message",
            recipient: { recipientId: "1" },
            _id: "11234",
            createdAt: 1234567,
            user: { _id: "1234", name: "some name" },
          },
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(
      (generator.next(event.event.payload).value as CallEffect).payload.fn
        .toString()
        .includes("handleMarkConversationRead")
    ).toBeTruthy();
    expect(generator.next(event.event).value).toEqual(
      put(sendEvent(event.event))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle LEFT_CONVERSATION event type", () => {
    const event = {
      event: {
        messageType: LEFT_CONVERSATION as MessageTypes,
        payload: {} as any,
      },
    };

    const generator = functions.chooseMessageType(event);

    expect(generator.next(event.event).value).toEqual(
      put(sendEvent(event.event))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle GET_WHO_IS_AROUND event type", () => {
    const event = {
      event: {
        messageType: GET_WHO_IS_AROUND as MessageTypes,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
          _id: "11234",
          createdAt: 1234567,
          user: { _id: "1234", name: "some name" },
          unread: true,
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next(event.event).value).toEqual(
      put(sendEvent(event.event))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle RECEIVE_CONVERSATION event type", () => {
    const event = {
      event: {
        messageType: RECEIVE_CONVERSATION,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("handleReceiveConversationForChat")
    ).toBeTruthy();
    expect(generator.next().done).toBeTruthy();
  });

  it("handle UPDATE_WHO_IS_AROUND event type", () => {
    const event = {
      event: {
        messageType: UPDATE_WHO_IS_AROUND as MessageTypes,
        payload: {
          text: "test message",
          recipient: { recipientId: "1" },
          _id: "11234",
          createdAt: 1234567,
          user: { _id: "1234", name: "some name" },
          unread: true,
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next(event.event).value).toEqual(
      put(sendEvent(event.event))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle RECEIVE_STATUS event type", () => {
    const event = {
      event: {
        messageType: RECEIVE_STATUS,
        payload: {
          isOnline: true,
          onlineUntil: 123456,
          seafarerId: "112393",
        },
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next(event.event.payload).value).toEqual(
      put(setIsOnline(event.event.payload))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle PROFILE event type", () => {
    const event = {
      event: {
        messageType: PROFILE,
        payload: {
          blob: "blob",
          familyName: "user",
          middleName: "",
          firstName: "some",
          history: [],
          onlineUntil: 123456,
          oracleId: "112393",
        } as ProfilePayload,
      },
    };

    const generator = functions.chooseMessageType(event);
    expect(generator.next(event.event.payload).value).toEqual(
      put(setMyProfile(event.event.payload))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("handle NEARBY_SEAFARERS event type", () => {
    const event = {
      event: {
        messageType: NEARBY_SEAFARERS,
        payload: [],
      },
    };

    const generator = functions.chooseMessageType(event);

    expect(generator.next(event.event.payload).value).toEqual(
      put(setWhoIsAround(event.event.payload))
    );
    expect(generator.next().done).toBeTruthy();
  });
});

describe("test selectors", () => {
  it("should return correct data when requesting getCurrentChatSelector when state has value", () => {
    const state = {
      websocketReducer: {
        "1234": [
          {
            _id: "1234",
            text: "text",
            createdAt: 1606156345000,
            unread: false,
            user: {
              _id: "1234",
              name: "Some Name",
            },
          },
        ],
      },
    };
    const res = functions.getCurrentChatSelector(
      (state as unknown) as IRootReducerType,
      "1234"
    );
    expect(res).toEqual([
      {
        _id: "1234",
        text: "text",
        createdAt: 1606156345000,
        unread: false,
        user: {
          _id: "1234",
          name: "Some Name",
        },
      },
    ]);
  });
  it("should return correct data when requesting getCurrentChatSelector when state has no value", () => {
    const state = {
      websocketReducer: {
        "1234": [
          {
            _id: "1234",
            text: "text",
            createdAt: 1606156345000,
            unread: false,
            user: {
              _id: "1234",
              name: "Some Name",
            },
          },
        ],
      },
    };
    const res = functions.getCurrentChatSelector(
      (state as unknown) as IRootReducerType,
      "12345"
    );
    expect(res).toEqual([]);
  });
  it("should return correct data when requesting getCurrentHistorySelector when state has value", () => {
    const state = {
      websocketReducer: {
        history: [
          {
            blob: "blob",
            lastMessage: "message",
            lastMessageTs: 1606156345000,
            recipientId: "1234",
            familyName: "Family",
            firstName: "Name",
            middleName: "",
            unreadCount: 0,
          },
        ],
      },
    };
    const res = functions.getCurrentHistorySelector(
      (state as unknown) as IRootReducerType
    );
    expect(res).toEqual([
      {
        blob: "blob",
        lastMessage: "message",
        lastMessageTs: 1606156345000,
        recipientId: "1234",
        familyName: "Family",
        firstName: "Name",
        middleName: "",
        unreadCount: 0,
      },
    ]);
  });
  it("should return correct data when requesting getCurrentHistorySelector when state has no value", () => {
    const state = {
      websocketReducer: {},
    };
    const res = functions.getCurrentHistorySelector(
      (state as unknown) as IRootReducerType
    );
    expect(res).toEqual([]);
  });
  it("should return correct data when requesting getCurrentUsers when state has value", () => {
    const state = {
      websocketReducer: {
        whoIsAround: [
          {
            blob: "blob",
            familyName: "Family",
            firstName: "Name",
            middleName: "",
            onlineUntil: 1606156345000,
            oracleId: 1234,
          },
        ],
      },
    };
    const res = functions.getCurrentUsers(
      (state as unknown) as IRootReducerType
    );
    expect(res).toEqual([
      {
        blob: "blob",
        familyName: "Family",
        firstName: "Name",
        middleName: "",
        onlineUntil: 1606156345000,
        oracleId: 1234,
      },
    ]);
  });
  it("should return correct data when requesting getCurrentUsers when state has no value", () => {
    const state = {
      websocketReducer: {},
    };
    const res = functions.getCurrentUsers(
      (state as unknown) as IRootReducerType
    );
    expect(res).toEqual([]);
  });
});

describe("test handleGetMessage", () => {
  it("should return the correct data when succeeds", () => {
    const message = {
      _id: "1234",
      text: "text",
      createdAt: 1606156345000,
      unread: false,
      user: {
        _id: "1234",
        name: "Some Name",
      },
    };

    const generator = functions.handleGetMessage(message, "1234");
    expect(generator.next([]).value).toEqual(
      select(functions.getCurrentChatSelector, "1234")
    );
    expect(generator.next([]).value).toEqual(
      put(
        getDirectMessage(
          [{ ...message, _id: "1234-1606156345000" }] as any,
          "1234"
        )
      )
    );
    expect(generator.next().done).toBeTruthy();
  });
});
describe("test handleSetHistoryMessage", () => {
  it("should return the correct data when succeeds when userFromHistory is defined and createdAt is number", () => {
    const message = {
      _id: "1234",
      text: "text",
      createdAt: 1606156345000,
      unread: false,
      user: {
        _id: "1234",
        name: "Some Name",
        blob: "blob",
      },
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
    };

    const generator = functions.handleSetHistoryMessage(message, "1234");
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([
        historyMessage,
        { ...historyMessage, recipientId: "12" },
      ] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(select(functions.getCurrentUsers));
    expect(generator.next([]).value).toEqual(
      put(
        setHistoryMessage([
          {
            blob: historyMessage.blob,
            lastMessage: message.text,
            lastMessageTs: message.createdAt,
            recipientId: historyMessage.recipientId,
            familyName: historyMessage.familyName,
            middleName: historyMessage.middleName,
            firstName: historyMessage.firstName,
            unreadCount: 0,
          },
          {
            blob: historyMessage.blob,
            lastMessage: "message",
            lastMessageTs: message.createdAt,
            recipientId: "12",
            familyName: historyMessage.familyName,
            middleName: historyMessage.middleName,
            firstName: historyMessage.firstName,
            unreadCount: 0,
          },
        ])
      )
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should return the correct data when succeeds when userFromHistory is defined and createdAt is Date", () => {
    MockDate.set(1574237559000);

    const message = {
      _id: "1234",
      text: "text",
      createdAt: new Date(),
      unread: true,
      user: {
        _id: "1234",
        name: "Some Name",
        blob: "blob",
      },
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
      onlineUntil: 0,
      oracleId: "1234",
    };

    const generator = functions.handleSetHistoryMessage(message, "1234");
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(generator.next([historyMessage]).value).toEqual(
      select(functions.getCurrentUsers)
    );
    expect(generator.next([]).value).toEqual(
      put(
        setHistoryMessage([
          {
            blob: historyMessage.blob,
            lastMessage: message.text,
            lastMessageTs: message.createdAt.getTime(),
            recipientId: historyMessage.recipientId,
            familyName: historyMessage.familyName,
            middleName: historyMessage.middleName,
            firstName: historyMessage.firstName,
            unreadCount: 1,
          },
        ])
      )
    );
    expect(generator.next().done).toBeTruthy();
    MockDate.reset();
  });
  it("should return the correct data when succeeds when userFromHistory is undefined and createdAt is number", () => {
    const message = {
      _id: "1234",
      text: "text",
      createdAt: 1606156345000,
      unread: false,
      user: {
        _id: "12345",
        name: "Some Name",
        blob: "blob",
      },
    };

    const user = {
      blob: "blob",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      onlineUntil: 0,
      oracleId: "12345",
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
      onlineUntil: 0,
      oracleId: "1234",
    };

    const generator = functions.handleSetHistoryMessage(message, "12345");
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([historyMessage] as GetHistoryPayload[] & NearbySeafarer[])
        .value
    ).toEqual(select(functions.getCurrentUsers));

    expect(
      generator.next([user] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(
      put(
        setHistoryMessage([
          {
            blob: historyMessage.blob,
            lastMessage: message.text,
            lastMessageTs: message.createdAt,
            recipientId: "12345",
            familyName: historyMessage.familyName,
            middleName: historyMessage.middleName,
            firstName: historyMessage.firstName,
            unreadCount: 0,
          },
          historyMessage,
        ])
      )
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should return the correct data when succeeds when userFromHistory is undefined and createdAt is Date", () => {
    MockDate.set(1574237559000);

    const message = {
      _id: "1234",
      text: "text",
      createdAt: new Date(),
      unread: true,
      user: {
        _id: "1234",
        name: "Some Name",
        blob: "blob",
      },
    };

    const user = {
      blob: "blob",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      onlineUntil: 0,
      oracleId: "12345",
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
      onlineUntil: 0,
      oracleId: "1234",
    };

    const generator = functions.handleSetHistoryMessage(message, "12345");
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([historyMessage] as GetHistoryPayload[] & NearbySeafarer[])
        .value
    ).toEqual(select(functions.getCurrentUsers));
    expect(
      generator.next([user] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(
      put(
        setHistoryMessage([
          {
            blob: historyMessage.blob,
            lastMessage: message.text,
            lastMessageTs: message.createdAt.getTime(),
            recipientId: "12345",
            familyName: historyMessage.familyName,
            middleName: historyMessage.middleName,
            firstName: historyMessage.firstName,
            unreadCount: 1,
          },
          historyMessage,
        ])
      )
    );
    expect(generator.next().done).toBeTruthy();
    MockDate.reset();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchSetWebsocketData)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});

describe("handleMarkConversationRead test", () => {
  it("should mark a conversation as read", () => {
    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 1,
      onlineUntil: 0,
      oracleId: "1234",
    };

    const generator = functions.handleMarkConversationRead("1234");
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );

    expect(
      generator.next([
        historyMessage,
        { ...historyMessage, recipientId: "12345" },
      ]).value
    ).toEqual(
      put(
        setHistoryMessage([
          { ...historyMessage, unreadCount: 0 },
          { ...historyMessage, recipientId: "12345" },
        ])
      )
    );
  });
});

describe("handleInAppPushNotification test", () => {
  it("call appropriate action when a new push notification is received when userFromWhoIsAround is defined", () => {
    const notification = {
      notificationId: "chat-12345-123",
      notificationBody: "test",
      "pinpoint.jsonBody": "test",
      _data: { data: { jsonBody: { notificationCategory: "test" } } },
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
    };

    const user = {
      blob: "blob",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      onlineUntil: 0,
      oracleId: "12345",
    };

    const generator = functions.handleInAppPushNotification(notification);
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([historyMessage] as GetHistoryPayload[] & NearbySeafarer[])
        .value
    ).toEqual(select(functions.getCurrentUsers));
    expect(
      generator.next([user] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(
      put(
        setPushNotificationToPop({
          notification: notification,
          user,
        })
      )
    );
  });
  it("call appropriate action when a new push notification is received when userFromHistory is defined", () => {
    const notification = {
      notificationId: "chat-1234-123",
      notificationBody: "test",
      "pinpoint.jsonBody": "test",
      _data: { data: { jsonBody: { notificationCategory: "test" } } },
    };

    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
    };

    const user = {
      blob: "blob",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      onlineUntil: 0,
      oracleId: "12345",
    };

    const generator = functions.handleInAppPushNotification(notification);
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([historyMessage] as GetHistoryPayload[] & NearbySeafarer[])
        .value
    ).toEqual(select(functions.getCurrentUsers));
    expect(
      generator.next([user] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(
      put(
        setPushNotificationToPop({
          notification: notification,
          user: (historyMessage as unknown) as NearbySeafarer,
        })
      )
    );
  });

  it("call appropriate action when a new push notification is received when userFromWhoIsAround and userFromHistory are undefined", () => {
    const notification = {
      notificationId: "chat-1234-123",
      notificationBody: "test",
      "pinpoint.jsonBody": "test",
      _data: { data: { jsonBody: { notificationCategory: "test" } } },
    };

    const generator = functions.handleInAppPushNotification(notification);
    expect(generator.next().value).toEqual(
      select(functions.getCurrentHistorySelector)
    );
    expect(
      generator.next([] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(select(functions.getCurrentUsers));
    expect(
      generator.next([] as GetHistoryPayload[] & NearbySeafarer[]).value
    ).toEqual(put(setPushNotificationToPop()));
  });
});

describe("test handleSetInitialHistory", () => {
  it("should call the appropriate action when calling handleSetInitialHistory", () => {
    const historyMessage = {
      blob: "blob",
      lastMessage: "message",
      lastMessageTs: 1606156345000,
      recipientId: "1234",
      familyName: "Family",
      firstName: "Name",
      middleName: "",
      unreadCount: 0,
    };
    const generator = functions.handleSetInitialHistory([historyMessage]);
    expect(generator.next().value).toEqual(
      put(setInitialHistory([historyMessage]))
    );
  });
});
describe("test handleReceiveConversationForChat", () => {
  it("should call the appropriate action when calling handleReceiveConversationForChat", () => {
    MockDate.set(1574237559000);
    const conv = {
      _id: "1234",
      text: "text",
      createdAt: new Date(),
      unread: true,
      user: {
        _id: "1234",
        name: "Some Name",
        blob: "blob",
      },
    };
    const message = {
      chatId: "1234",
      conversation: [conv],
    };

    const generator = functions.handleReceiveConversationForChat(message);
    expect(generator.next().value).toEqual(
      put(receiveConversationForChat(message))
    );
    MockDate.reset();
  });
});

describe("test handleSendMessage", () => {
  MockDate.set(1574237559000);
  it("should call the appropriate action when calling handleSendMessage", () => {
    const conv = {
      _id: "1234",
      text: "text",
      createdAt: new Date(),
      unread: true,
      user: {
        _id: "1234",
        name: "Some Name",
        blob: "blob",
      },
    };

    const payload = {
      text: conv.text,
      createdAt: conv.createdAt.getTime(),
      recipientId: "1234",
      senderId: "1234",
    };

    const generator = functions.handleSendMessage({
      messageType: SEND_MESSAGE,
      payload: {
        text: conv,
        recipient: {
          recipientId: "1234",
          name: "Some Name",
          blob: "blob",
        },
        user: {
          _id: "1234",
          name: "Some Name",
          blob: "blob",
        },
      },
    });
    expect(generator.next().value).toEqual(
      put(sendEvent({ messageType: SEND_MESSAGE, payload }))
    );
    MockDate.reset();
  });
});
