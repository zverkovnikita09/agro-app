import { baseApi } from "@shared/api/api";
import { CodeVerificationRequest, CodeVerificationResponse, LoginRequest, LoginResponse, User } from "./User.model";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    codeVerification: mutation<CodeVerificationResponse, CodeVerificationRequest>({
      query: ({code, phone_number})=>({url:"/login/verification", method: "POST", body: {phone_number, code}}),
      transformResponse: (response: {data: CodeVerificationResponse})=> response.data,
    }),
    login: mutation<LoginResponse, LoginRequest>({
      query: ({phone_number})=>({url:"/login", method: "POST", body: {phone_number}}),
      transformResponse: (response: {data: LoginResponse})=> response?.data,
    }),
    getUserData: query<User, void>({
      query: () => "/user",
      transformResponse: (response: {data: {user: User}})=> response?.data?.user,
      keepUnusedDataFor: 0.0001
    }),
    getTaxSystems: query<string[], void>({
      query: () => "/userprofile/tax-systems",
      transformResponse: (response: {data: string[]})=> response?.data,
    }),
  }),
  overrideExisting: true,
})
export const {useCodeVerificationMutation, useLoginMutation,useGetUserDataQuery, useGetTaxSystemsQuery} = usersApi;