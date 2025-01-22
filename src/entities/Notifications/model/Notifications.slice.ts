import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification, NotificationState, NotificationType } from "./Notifications.model";

const initialState: NotificationState = {
  notifications: []
}

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, {payload: {message, type, timeout, id}}: PayloadAction<Notification>){
      return {...state, notifications: [...state.notifications, {id, message, type, timeout}]}
    },
    removeNotification(state, {payload: id}: PayloadAction<string>){
      return {...state, notifications: state.notifications.filter(item=> item.id !== id)}
    }
  }
})

export const {addNotification, removeNotification} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;