import { RootState } from "@app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectFiltersState = (state: RootState) => state.sort;

const selectSort = createSelector(selectFiltersState, (state)=>state.sortBy);

export const SortSelectors = {
  selectSort
}