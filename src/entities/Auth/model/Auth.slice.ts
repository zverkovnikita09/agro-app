import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./Auth.model";

const initialState: AuthState = {
  timeOfLogin: 0,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken (state, {payload: token}: PayloadAction<string>){
      return {...state, token}
    },
    removeToken(state) {
      return {...state, token: undefined}
    },
    setUserPhone(state, {payload: phoneNumber}: PayloadAction<string>){
      return {...state, phoneNumber}
    },
    removeUserPhone(state) {
      return {...state, phoneNumber: undefined}
    },
    setTimeOfLogin(state, {payload: timeOfLogin}: PayloadAction<number>){
      return {...state, timeOfLogin}
    },
    removeTimeOfLogin(state) {
      return {...state, timeOfLogin: 0}
    },
  }
})

export const {setUserPhone, setToken, removeUserPhone, removeToken, removeTimeOfLogin, setTimeOfLogin} = authSlice.actions;
export const authReducer = authSlice.reducer;