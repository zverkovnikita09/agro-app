import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./Auth.model";

const initialState: AuthState = {
  refetchCodeTime: 0
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
    setRefetchCodeTime(state, {payload: refetchCodeTime}: PayloadAction<number>){
      return {...state, refetchCodeTime}
    },
  }
})

export const {setUserPhone, setToken, removeUserPhone, removeToken, setRefetchCodeTime} = authSlice.actions;
export const authReducer = authSlice.reducer;