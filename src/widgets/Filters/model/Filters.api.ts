import { baseApi } from "@shared/api/api";
import { OptionsResponse, RegionsResponse } from "./Filters.model";

export const filtersApi = baseApi.injectEndpoints({
  endpoints: ({query})=>({
    getRegions: query<RegionsResponse, void>({
      query: ()=>"/orders/regions",
      transformResponse: (response: {data: Record<keyof RegionsResponse, Record<string, RegionsResponse[keyof RegionsResponse][number]>>})=> {        
        return {
          load_regions: Object.values(response?.data.load_regions),
          unload_regions: Object.values(response?.data.unload_regions),
        }
      },
      keepUnusedDataFor: 0.001
    }),
    getOptions: query<OptionsResponse, void>({
      query: ()=>"/options",
      transformResponse: (response: {data: OptionsResponse})=> response?.data,
    }),
  }),
  overrideExisting: true,
})
export const {useGetOptionsQuery, useGetRegionsQuery} = filtersApi;