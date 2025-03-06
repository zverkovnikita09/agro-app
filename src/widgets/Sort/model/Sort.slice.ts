import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortState, SortTypes } from "./Sort.model";

const initialState: SortState = {
  sortBy: null
}
const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, {payload}: PayloadAction<SortTypes>){
      return { ...state, sortBy: payload}
    },
  }
})

export const {setSort} = sortSlice.actions;
export const sortReducer = sortSlice.reducer;