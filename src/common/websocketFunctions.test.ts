import { validateUserInChat, initializeWs } from "./websocketFunctions";
import * as WebsocketFunctionsHelper from "./websocketFunctions";
import * as ReconnectingWebSocket from "reconnecting-websocket";
import { Auth } from "aws-amplify";
import * as RNConfig from "../constants/config";
import * as axiosWrapper from "./request";
describe("test validateUserInChat", () => {
  it("should call fetch and succeeds", async () => {
    const spy = jest
      .spyOn(axiosWrapper, "default")
      .mockImplementation(async () => Promise.resolve({}));

    await validateUserInChat();

    expect(axiosWrapper.default).toHaveBeenCalledWith({
      endpoint: "validateWebsocket",
      requestMethod: "GET",
    });

    spy.mockRestore();
  });
});

describe("test url function", () => {
  it("should return correct url", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue({
      getAccessToken: () => ({
        getJwtToken: () => "1234",
        payload: {
          username: "12345",
        },
      }),
    });

    const spy = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "url",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    const res = await WebsocketFunctionsHelper.url();
    expect(res).toBe("url/12345?token=1234");
    spy.mockRestore();
  });
});

describe("test initializeWs", () => {
  it("should initialize corrent websocket", async () => {
    const spy = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });
    const spy2 = jest
      .spyOn(WebsocketFunctionsHelper, "validateUserInChat")
      .mockImplementation(async () => {
        Promise.resolve({});
      });

    const spy3 = jest
      .spyOn(ReconnectingWebSocket, "default")
      .mockImplementation();

    await initializeWs();
    expect(WebsocketFunctionsHelper.validateUserInChat).toHaveBeenCalledTimes(
      1
    );

    expect(ReconnectingWebSocket.default).toHaveBeenCalledTimes(1);

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
  });
});

describe("test handleReceiveMessage", () => {
  it("should call the correct dispatch function successfully", () => {
    expect(() =>
      WebsocketFunctionsHelper.handleReceiveMessage(
        {
          data: JSON.stringify({
            messageType: "Some Event",
            payload: { temp: "value" },
          }),
          target: "" as any,
          type: "",
        },
        () => ({ type: "" }),
        () => {}
      )
    ).not.toThrow();
  });
});

describe("test getInitialHistory", () => {
  it("should call the correct ws.send function successfully", () => {
    const spy = jest
      .spyOn(ReconnectingWebSocket, "default")
      .mockImplementation();

    const ws = new ReconnectingWebSocket.default(() => "ws://localhost1234");

    ws.send = jest.fn();

    WebsocketFunctionsHelper.getInitialHistory(ws);

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({
        messageType: "getHistory",
        payload: {
          from: 0,
          to: 100,
        },
      })
    );

    spy.mockRestore();
  });
});
describe("test openWs", () => {
  it("should call the correct ws.onopen function successfully", async () => {
    const spy = jest
      .spyOn(ReconnectingWebSocket, "default")
      .mockImplementation();

    const ws = new ReconnectingWebSocket.default(() => "ws://localhost1234");

    ws.onopen = jest.fn().mockImplementation();

    await WebsocketFunctionsHelper.openWs(ws);

    expect(ws.onopen).toBeTruthy();

    console.log = jest.fn();

    ws.onopen && ws.onopen("e" as any);

    expect(console.log).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});

describe("test onMessageWs", () => {
  it("should call the correct ws.onmessage function successfully", async () => {
    const spy = jest
      .spyOn(ReconnectingWebSocket, "default")
      .mockImplementation();
    const spy2 = jest
      .spyOn(WebsocketFunctionsHelper, "handleReceiveMessage")
      .mockImplementation();

    const ws = new ReconnectingWebSocket.default(() => "ws://localhost1234");

    WebsocketFunctionsHelper.onMessageWs(
      ws,
      () => ({ type: "" }),
      () => {}
    );

    expect(ws.onmessage).toBeInstanceOf(Function);
    ws.onmessage && ws.onmessage("e" as any);
    expect(WebsocketFunctionsHelper.handleReceiveMessage).toHaveBeenCalledTimes(
      1
    );
    spy.mockRestore();
    spy2.mockRestore();
  });
});

describe("test closeWs", () => {
  it("should call the correct ws.onclose function successfully", async () => {
    const spy = jest
      .spyOn(ReconnectingWebSocket, "default")
      .mockImplementation();

    const ws = new ReconnectingWebSocket.default(() => "ws://localhost1234");
    console.log = jest.fn();
    WebsocketFunctionsHelper.closeWs(
      ws,
      () => ({ type: "" }),
      () => {}
    );

    expect(ws.onclose).toBeInstanceOf(Function);
    ws.onclose && ws.onclose("e" as any);
    expect(console.log).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
