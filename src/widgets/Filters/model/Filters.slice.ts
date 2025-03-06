import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersType, FiltersState } from "./Filters.model";

const initialState: FiltersState = {
  filters: {},
  saveFilters: false
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, {payload: filters}: PayloadAction<Partial<FiltersType>>){
      return { ...state, filters}
    },
    setSaveFilters(state, {payload: value}: PayloadAction<boolean>){
      return { ...state, saveFilters: value}
    },
    clearFilters(state){
      return {...state, filters: {}}
    },
  }
})

export const {clearFilters, setFilters, setSaveFilters} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;