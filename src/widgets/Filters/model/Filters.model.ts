import { Application } from "@entities/Applications";

export interface FiltersType extends Pick<Partial<Application>, "is_overload" | "clarification_of_the_weekend" | "is_full_charter" | "manager_id"> {
  distance_from?: number;
  distance_to?:number;
  load_region?: string[];
  unload_region?: string[];
  load_city?: string[];
  unload_city?: string[];
  crop?: string[];
  with_nds?: number;
  tariff_from?: string;
  tariff_to?: string;
  timeslot?:string[];
  load_method?: string[];
  unload_methods?: string[];
  load_types?: string[];
  scale_length?: string;
  height_limit?: string;
  weekend_state?: [string, string]
}

export interface FiltersState {
  filters: FiltersType;
  saveFilters: boolean;
}

export interface OptionsResponse {
  crop: string[];
  load_types: {id: string; title: string}[];
  timeslot: string[];
  unload_methods: {id: string;title: string}[];
  load_methods: string[];
}

export interface RegionsResponse {
  load_regions: string[];
  unload_regions: string[];
}