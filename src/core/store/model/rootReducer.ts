import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { RootState } from "./store.model";
import { notificationReducer } from "@entities/Notifications";
import { persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "@entities/Auth";
import { baseApi } from "@shared/api/api";
import { applicationsReducer } from "@entities/Applications";
import { filtersReducer } from "@widgets/Filters";
import { sortReducer } from "@widgets/Sort";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ["auth"]
}

export const RootReducer: Reducer = combineReducers({
  notifications: notificationReducer,
  auth: authReducer,
  applications: applicationsReducer,
  filters: filtersReducer,
  sort: sortReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export const persistedReducer = persistReducer(persistConfig, RootReducer)