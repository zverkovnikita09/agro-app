import { baseApi } from "@shared/api/api";
import { Application } from "./Applications.model";
import { SortTypes } from "@widgets/Sort";
import { FiltersType } from "@widgets/Filters";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    getApplications: query<Application[], {sort?: SortTypes, filters?:FiltersType} | void>({
      query: (params) => {
        const queries = new URLSearchParams();
        if(params?.sort){
          queries.append("sort", params.sort)
        }
        if(params?.filters && Object.keys(params.filters).length) {
          Object.entries(params.filters).forEach(([key, value])=>{
            if(Array.isArray(value)){
              value.forEach((arrValue)=>queries.append(`${key}[]`, arrValue))
            }
            else {
              queries.append(key,value)
            }
          })
        }                        
        return {
          url: '/orders',
          params: queries,
        };
      },
      transformResponse: (response: {data: Application[]})=> response?.data,
      providesTags: ["Applications"],
    }),
    getUserAplications: query<Application[], void>({
      query: () => "/user-orders",
      transformResponse: (response: {data: Application[]})=> response?.data,
      providesTags: ["UserApplications"],
    }),
    getApplicationById: query<Application, {id: string}>({
      query: ({id}) => `/orders/${id}`,
      transformResponse: (response: {data: Application})=> response?.data,
    }),
    createOffer: mutation<void, {order_id: string}>({
      query: ({order_id}) =>({url:"/offers/create", method: "POST", body: {order_id}}),
      invalidatesTags: ["Applications", "UserApplications"]
    }),
  }),
  overrideExisting: true,
})
export const {useGetApplicationsQuery, useGetUserAplicationsQuery, useCreateOfferMutation, useGetApplicationByIdQuery} = applicationsApi;