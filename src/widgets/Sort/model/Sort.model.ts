export type SortTypes =  "tariff" | "-tariff" | "distance" | "-distance" | null

export interface SortState {
  sortBy: SortTypes
}

export const SORT_OPTIONS: {name: string; value: SortTypes}[] = [
  {
    name: "По умолчанию",
    value: null,
  },
  {
    name: "Сначала с меньшей дистанцией",
    value: "distance"
  },
  {
    name: "Сначала с большей дистанцией",
    value: "-distance"
  },
  {
    name: "Сначала дешевле",
    value: "tariff"
  },
  {
    name: "Сначала дороже",
    value: "-tariff"
  },
];
