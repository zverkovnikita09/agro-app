import { baseApi } from "@shared/api/api";
import { Application } from "./Applications.model";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    getApplications: query<Application[], void>({
      query: () => "/orders",
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