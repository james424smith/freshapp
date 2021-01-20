import reducer, { defaultState } from "../websocketReducer";
import {
  CLEAR_ALL_STATE,
  SEND_EVENT,
  GET_DIRECT_MESSAGE,
  SET_MESSAGE_HISTORY,
  SET_WHO_IS_AROUND,
  SET_INITIAL_HISTORY,
  SET_CONVERSATION,
  SET_PROFILE_DETAILS,
  SET_IS_ONLINE_CHAT,
  SET_CHAT_USERS,
  SET_REFRESHING_HISTORY,
  CLEAR_SENT_MESSAGE,
  SET_NEW_CHAT_NOTIFICATION,
} from "../../constants";
import {
  ChatPushNotificationToSet,
  GetMessagePayload,
  MessageTypes,
  SEND_MESSAGE,
} from "../../../interfaces/websocketTypes";

describe("Test websocket related Reducer", () => {
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

  it("should handle GET_DIRECT_MESSAGE action", () => {
    const mockChatId = "112393";
    const message: GetMessagePayload = {
      _id: "string",
      text: "string",
      createdAt: 1234,
      user: { _id: "112393", name: "string" },
      unread: false,
    };

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_DIRECT_MESSAGE,
          payload: message,
          chatId: mockChatId,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      [mockChatId]: message,
    });
  });

  it("should handle SET_REFRESHING_HISTORY action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_HISTORY,
          payload: true,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingNewHistory: true,
    });
  });

  it("should handle CLEAR_SENT_MESSAGE action", () => {
    expect(
      reducer(
        {
          ...defaultState,
          message: {
            messageType: SEND_MESSAGE as MessageTypes,
            payload: { distance: 123 },
          },
        },
        {
          type: CLEAR_SENT_MESSAGE,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      message: undefined,
    });
  });

  it("should handle SET_MESSAGE_HISTORY action", () => {
    const mockHistory = "112393";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_MESSAGE_HISTORY,
          payload: mockHistory,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      history: mockHistory,
    });
  });

  it("should handle SEND_EVENT action", () => {
    const mockMessage = "Hello";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SEND_EVENT,
          payload: mockMessage,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      message: mockMessage,
    });
  });

  it("should handle SET_WHO_IS_AROUND action", () => {
    const mockWhoIsAround = "blabla";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_WHO_IS_AROUND,
          payload: mockWhoIsAround,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      whoIsAround: mockWhoIsAround,
    });
  });

  it("should handle SET_INITIAL_HISTORY action", () => {
    const mockHistory = "blabla";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_INITIAL_HISTORY,
          payload: mockHistory,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      history: mockHistory,
    });
  });

  it("should handle SET_CONVERSATION action", () => {
    const payload = { chatId: 112393, conversation: [] };
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_CONVERSATION,
          payload,
        }
      )
    ).toEqual({
      ...defaultState,
      [payload.chatId]: payload.conversation,
      loader: false,
    });
  });

  it("should handle SET_PROFILE_DETAILS action", () => {
    const mockProfile = "blabla";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_PROFILE_DETAILS,
          payload: mockProfile,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      profile: mockProfile,
    });
  });

  it("should handle SET_IS_ONLINE_CHAT action", () => {
    const mockData = {
      isOnline: "blabla",
      onlineUntil: "blabla",
    };

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_ONLINE_CHAT,
          payload: mockData,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      isOnline: mockData.isOnline,
      onlineUntil: mockData.onlineUntil,
    });
  });

  it("should handle SET_IS_ONLINE_CHAT action and isOnline is false", () => {
    const mockData = {
      isOnline: false,
    };

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_ONLINE_CHAT,
          payload: mockData,
        }
      )
    ).toEqual({
      ...defaultState,
      onlineUntil: undefined,
      loader: false,
    });
  });

  it("should handle SET_CHAT_USERS action", () => {
    const mockUsers = "blabla";

    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_CHAT_USERS,
          payload: mockUsers,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      users: mockUsers,
    });
  });
  it("should handle SET_NEW_CHAT_NOTIFICATION action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_NEW_CHAT_NOTIFICATION,
          payload: ({ body: "1234" } as unknown) as ChatPushNotificationToSet,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      notificationToShow: { body: "1234" },
    });
  });
});
