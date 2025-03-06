import { baseApi } from "@shared/api/api";
import { User } from "./User.model";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({query})=>({
    getUserData: query<User, void>({
      query: () => "/user",
      transformResponse: (response: {data: {user: User}})=> response?.data?.user,
      providesTags: ["User"]
    }),
  }),
  overrideExisting: true,
})
export const {useGetUserDataQuery} = usersApi;