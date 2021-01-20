import ReconnectingWebSocket from "reconnecting-websocket";
import axiosWrapper from "./request";
import config from "../constants/config";
import { MessageEvent } from "ws";
import { RECEIVE_STATUS, WebsocketEvent } from "../interfaces/websocketTypes";
import { Auth } from "aws-amplify";
import { InitialisedSagaCall } from "../interfaces";
import * as WebsocketFunctionsHelper from "./websocketFunctions";
export declare const __DEV__: boolean;

export const validateUserInChat = async () => {
  //requested by the BE to check if the user is already assigned to an Actor
  await axiosWrapper({
    endpoint: "validateWebsocket",
    requestMethod: "GET",
  });
};

export const url = async () => {
  const { WEBSOCKET_BASE_URL } = config();
  const session = await Auth.currentSession();
  const token = session.getAccessToken().getJwtToken();
  const username = session.getAccessToken().payload.username;
  return `${WEBSOCKET_BASE_URL}/${username}?token=${token}`;
};

export const initializeWs = async (): Promise<ReconnectingWebSocket> => {
  const { ENV } = config();
  await WebsocketFunctionsHelper.validateUserInChat();
  return new ReconnectingWebSocket(WebsocketFunctionsHelper.url, undefined, {
    debug: ENV === "development",
  });
};

export const handleReceiveMessage = (
  evt: MessageEvent,
  setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall,
  dispatch: (arg: unknown) => void
) => {
  // on receiving a message, add it to the list of messages
  const event = JSON.parse(evt.data as string);
  dispatch(setWebsocketData(event));
};

export const getInitialHistory = (ws: ReconnectingWebSocket) => {
  const message = {
    messageType: "getHistory",
    payload: {
      from: 0,
      to: 100,
    },
  };
  ws.send(JSON.stringify(message));
};

export const openWs = async (ws: ReconnectingWebSocket) =>
  (ws.onopen = async () => {
    console.log("connected");
  });

export const onMessageWs = (
  ws: ReconnectingWebSocket,
  setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall,
  dispatch: (arg: unknown) => void
) =>
  (ws.onmessage = (evt: MessageEvent) => {
    WebsocketFunctionsHelper.handleReceiveMessage(
      evt,
      setWebsocketData,
      dispatch
    );
  });

export const closeWs = (
  ws: ReconnectingWebSocket,
  setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall,
  dispatch: (arg: unknown) => void
) =>
  (ws.onclose = () => {
    dispatch(
      setWebsocketData({
        messageType: RECEIVE_STATUS,
        payload: { isOnline: false, onlineUntil: 0, seafarerId: 1234 },
      })
    );
    console.log("disconnected");
  });
