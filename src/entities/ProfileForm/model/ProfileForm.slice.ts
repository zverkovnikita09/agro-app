import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  notifications: []
}

const profileFormSlice = createSlice({
  name: "profileForm",
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

export const {addNotification, removeNotification} = profileFormSlice.actions;
export const notificationReducer = profileFormSlice.reducer;