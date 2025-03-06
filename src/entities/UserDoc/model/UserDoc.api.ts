import { baseApi } from "@shared/api/api";
import { UserDocType } from "./UserDoc.model";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({query, mutation})=>({
    getUserDocs: query<UserDocType[], void>({
      query: () => "/files/on-signing",
      transformResponse: (response: {data: UserDocType[]})=> response?.data,
      providesTags: ["Docs"],
    }),
    singDoc: mutation<{data: any[], message: string, status: string}, {path: string}>({
      query: ({path})=>({
        url: "/sign-me",
        method: "POST",
        body: {path}
      })
    })
  }),
  overrideExisting: true,
})
export const {useGetUserDocsQuery, useSingDocMutation} = usersApi;