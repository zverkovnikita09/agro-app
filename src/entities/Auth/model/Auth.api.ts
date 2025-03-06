import { baseApi } from "@shared/api/api";
import { CodeVerificationRequest, CodeVerificationResponse, LoginRequest, LoginResponse } from "./Auth.model";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    codeVerification: mutation<CodeVerificationResponse, CodeVerificationRequest>({
      query: ({code, phone_number})=>({url:"/login/verification", method: "POST", body: {phone_number, code}}),
      transformResponse: (response: {data: CodeVerificationResponse})=> response.data,
    }),
    login: mutation<LoginResponse, LoginRequest>({
      query: ({phone_number})=>({url:"/login", method: "POST", body: {phone_number}}),
      transformResponse: (response: {data: LoginResponse})=> response?.data,
      invalidatesTags: ["User", "UserApplications", "Docs"]
    }),
  }),
  overrideExisting: true,
})
export const {useCodeVerificationMutation, useLoginMutation} = usersApi;