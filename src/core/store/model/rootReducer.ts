import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { notificationReducer } from "@entities/Notifications";
import { persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "@entities/Auth";
import { baseApi } from "@shared/api/api";
import { applicationsReducer } from "@entities/Applications";
import { filtersReducer } from "@widgets/Filters";
import { sortReducer } from "@widgets/Sort";
import expoPushTokenReducer from './expoPushTokenSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["auth", "expoPushToken"]
}

export const RootReducer: Reducer = combineReducers({
  notifications: notificationReducer,
  auth: authReducer,
  applications: applicationsReducer,
  filters: filtersReducer,
  sort: sortReducer,
  expoPushToken: expoPushTokenReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export const persistedReducer = persistReducer(persistConfig, RootReducer)
