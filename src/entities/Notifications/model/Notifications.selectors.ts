import { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectNotificationsState = (state: RootState) => state.notifications;

const selectAllNotifications = createSelector(selectNotificationsState, (state)=>state.notifications);

export const NotificationSelectors = {
  selectAllNotifications,
}