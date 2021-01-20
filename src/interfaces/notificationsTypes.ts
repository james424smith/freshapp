export interface NotificationDetails {
  category: string;
  date: string;
  description: string;
  isRead: boolean;
  notificationId: number;
  title: string;
}

export interface ReadNotification {
  notificationRead: boolean;
  notificationId: string;
}
export interface Notification {
  notifications?: NotificationDetails[];
  unreadCount: number;
}

export interface PushNotificationType {
  body?: string;
  _alert?: { body: string };
  data?: { "pinpoint.jsonBody": string };
  "pinpoint.jsonBody": string;
  _data: { data: { jsonBody: { notificationCategory: string } } };
}
