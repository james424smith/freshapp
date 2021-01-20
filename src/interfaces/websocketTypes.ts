import { PushNotificationType, Recipient } from "../interfaces";
export interface GetWhoIsAroundRequestPayload {
  distance: number;
}
export interface ChatUser {
  _id: string;
  name: string;
}

export interface SendMessageRequestPayload {
  message: string;
  createAt: number;
  blob?: string;
  recipientId: string;
  senderId: string;
}
export interface SendMessageSaga {
  text: string;
  createdAt: number;
  user: {
    _id?: string;
    blob?: string;
    name: string;
  };
  recipient: Recipient;
}

export interface GetMessagePayload {
  _id: string;
  text: string;
  createdAt: number | Date;
  unread: boolean;
  user: ChatUser;
}
export interface GetConversationRequestPayload {
  recipientId: string;
  from: number;
  size: number;
}

export interface GetConversationPayload {
  chatId: string;
  conversation: GetMessagePayload[];
}
export interface GetHistoryPayload {
  blob: string;
  lastMessage: string;
  lastMessageTs: number;
  recipientId: string;
  familyName: string;
  firstName: string;
  middleName: string;
  unreadCount: number;
}

interface Location {
  lat: number;
  lon: number;
}

export interface NearbySeafarer {
  blob: string;
  familyName: string;
  firstName: string;
  middleName: string;
  onlineUntil: number;
  oracleId: string;
}

export interface ChatSeafarer {
  blob: string;
  familyName: string;
  firstName: string;
  seafarerId: string;
}

export type GetNearbySeafarersPayload = NearbySeafarer[];

export interface UpdateWhoIsAroundRequest {
  seafarerId: string;
  pin: Location;
  onlineUntil?: number;
}

export interface ReceiveStatusPayload {
  isOnline: boolean;
  onlineUntil: number;
  seafarerId: string;
}

export interface ProfilePayload {
  blob: string;
  familyName: string;
  firstName: string;
  middleName: string;
  history: GetHistoryPayload[];
  onlineUntil: number;
  oracleId: string;
}

export interface ChatPushNotification extends PushNotificationType {
  notificationBody: string;
}

export interface ChatPushNotificationToSet {
  notification: ChatPushNotification;
  user: NearbySeafarer;
}

export const SEND_MESSAGE = "sendMessage";
export const RECEIVING_MESSAGE = "receiveMessage";
export const GET_HISTORY = "getHistory";
export const RECEIVE_HISTORY = "history";
export const LEFT_CONVERSATION = "leftConversation";
export const GET_CONVERSATION = "getConversation";
export const RECEIVE_CONVERSATION = "conversation";
export const GET_WHO_IS_AROUND = "sendWhoIsAround";
export const NEARBY_SEAFARERS = "nearbySeafarers";
export const UPDATE_WHO_IS_AROUND = "updateWhoIsAround";
export const RECEIVE_STATUS = "status";
export const PROFILE = "profile";
export const SET_NEW_CHAT_NOTIFICATION = "setNewChatNotification";

export type SEND_MESSAGE = "sendMessage";
export type RECEIVING_MESSAGE = "receiveMessage";
export type RECEIVE_HISTORY = "history";
export type GET_CONVERSATION = "getConversation";
export type LEFT_CONVERSATION = "leftConversation";
export type RECEIVE_CONVERSATION = "conversation";
export type GET_HISTORY = "getHistory";
export type GET_WHO_IS_AROUND = "sendWhoIsAround";
export type NEARBY_SEAFARERS = "nearbySeafarers";
export type UPDATE_WHO_IS_AROUND = "updateWhoIsAround";
export type RECEIVE_STATUS = "status";
export type PROFILE = "profile";
export type MARK_CONVERSATION_READ = "MARK_CONVERSATION_READ";
export type SET_NEW_CHAT_NOTIFICATION = "setNewChatNotification";

export type MessageTypes =
  | SEND_MESSAGE
  | RECEIVING_MESSAGE
  | RECEIVE_HISTORY
  | GET_HISTORY
  | RECEIVE_CONVERSATION
  | GET_CONVERSATION
  | GET_WHO_IS_AROUND
  | NEARBY_SEAFARERS
  | UPDATE_WHO_IS_AROUND
  | RECEIVE_STATUS
  | PROFILE
  | LEFT_CONVERSATION
  | MARK_CONVERSATION_READ
  | SET_NEW_CHAT_NOTIFICATION;

type WebspacketPayloads =
  | SendMessageRequestPayload
  | SendMessageSaga
  | GetMessagePayload
  | GetHistoryPayload[]
  | GetConversationRequestPayload
  | GetWhoIsAroundRequestPayload
  | GetNearbySeafarersPayload
  | UpdateWhoIsAroundRequest
  | GetConversationPayload
  | ReceiveStatusPayload
  | ProfilePayload
  | { chatId: number | string }
  | Record<never, never>
  | { recipientId?: number; from: number; size: number }
  | ChatPushNotification;

export interface WebsocketEvent {
  messageType: MessageTypes;
  payload: WebspacketPayloads;
}
