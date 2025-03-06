import { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectFiltersState = (state: RootState) => state.filters;

const selectFilters = createSelector(selectFiltersState, (state)=>state.filters);
const selectIsSaveFilters = createSelector(selectFiltersState, (state)=>state.saveFilters);

export const FiltersSelectors = {
  selectFilters,
  selectIsSaveFilters
}