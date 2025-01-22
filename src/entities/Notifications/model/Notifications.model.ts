export enum NotificationType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "sucess",
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timeout?: number;
}

export interface NotificationState {
  notifications: Notification[]
}