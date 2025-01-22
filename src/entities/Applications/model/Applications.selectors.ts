import { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectApplicationsState = (state: RootState) => state.applications;

const selectSelectedApplications = createSelector(selectApplicationsState, (state)=>state.selectedApplications);
const selectMapCenter = createSelector(selectApplicationsState, (state)=>state.mapCenter);
export const ApplicationsSelectors = {
  selectSelectedApplications,
  selectMapCenter
}