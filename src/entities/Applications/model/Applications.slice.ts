import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application, ApplicationsState, Coord } from "./Applications.model";

const initialState: ApplicationsState = {
  selectedApplications: [],
}

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setSelectedApplication(state, {payload}: PayloadAction<Application>){
      return { ...state, selectedApplications: [payload]}
    },
    clearSelectedApplication(state){
      return {...state, selectedApplications: []}
    },
    setMapCenter(state, {payload}: PayloadAction<Coord>){
      return { ...state, mapCenter: payload, selectedApplications: []}
    },
    clearMapCenter(state){
      return {...state, mapCenter: undefined}
    }
  }
})

export const {clearSelectedApplication, setSelectedApplication, clearMapCenter, setMapCenter} = applicationsSlice.actions;
export const applicationsReducer = applicationsSlice.reducer;