import { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state: RootState) => state.auth;

const selectPhoneNumber = createSelector(selectAuthState, (state)=>state.phoneNumber);
const selectToken = createSelector(selectAuthState, (state)=>state.token);
const selectTimeOfLogin = createSelector(selectAuthState, (state)=>state.timeOfLogin
);
export const AuthSelectors = {
  selectToken,
  selectPhoneNumber,
  selectTimeOfLogin
}