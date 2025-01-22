import { baseApi } from "@shared/api/api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    createFiles: mutation<void, void>({
      query: ()=>({url:"/load-files", method: "POST", body: {}}),
    }),
    deleteFiles: mutation<void, void>({
      query: () => ({url:"/files/delete-files", method: "DELETE", body: {}}),
    }),
    updateFiles: mutation<void, void>({
      query: () => ({url:"/files/update-files", method: "POST", body: {}}),
    }),
    createAvatar: mutation<void, void>({
      query: () => ({url:"/userprofile/avatar/create", method: "POST", body: {}}),
    }),
    updateAvatar: mutation<void, void>({
      query: () => ({url:"/userprofile/avatar/update", method: "POST", body: {}}),
    }),
    updateUserProfile: mutation<void, {id: string}>({
      query: ({id}) => ({url:`/counteragents/${id}`, method: "PUT", body: {}}),
    }),
    deleteUserProfile: mutation<void, void>({
      query: () => ({url:"/userprofile/delete", method: "PUT", body: {}}),
    }),
  }),
  overrideExisting: true,
})
export const {useCreateAvatarMutation, useCreateFilesMutation, useDeleteFilesMutation, useUpdateAvatarMutation, useUpdateFilesMutation} = usersApi;