import { baseApi } from "@shared/api/api";
import { ProfileForm } from "./ProfileForm.model";
import { User, UserInfo } from "@entities/User";
import FormData from "form-data";
import { convertFilesToFormData, convertFilesToUrlParams } from "../lib/ProfileForm.lib";

export const usersApi = baseApi.injectEndpoints({
  endpoints: ({mutation, query})=>({
    createFiles: mutation<void, {files: ProfileForm["files"]}>({
      query: ({files})=>({url:"/files/load-files", method: "POST", body: convertFilesToFormData(files)}),
    }),
    deleteFiles: mutation<void, {files: User["files"]}>({
      query: ({files}) => ({url:"/files/delete-files", method: "DELETE", params: convertFilesToUrlParams(files)}),
    }),
    updateFiles: mutation<void, {files: ProfileForm["files"]}>({
      query: ({files}) => ({url:"/files/update-files", method: "POST", body: convertFilesToFormData(files)}),
    }),
    createAvatar: mutation<void, {avatar: ProfileForm["avatar"]}>({
      query: ({avatar})=>{
        const formData = new FormData()
          formData.append("avatar", {
            uri: avatar?.uri,
            name: avatar?.name,
            type: avatar?.type
          })
        return {url:"/userprofile/avatar/create", method: "POST", body: formData}
      },
    }),
    updateAvatar: mutation<void, {avatar: ProfileForm["avatar"]}>({
      query: ({avatar})=>{        
        const formData = new FormData()
        formData.append("avatar", {
          uri: avatar?.uri,
          name: avatar?.name,
          type: avatar?.type
        })
      return {url:"/userprofile/avatar/update", method: "POST", body: formData}     
  }}),
    updateUserProfile: mutation<void, {id: string; data: UserInfo}>({
      query: ({id, data}) => {
        const body = {};
        if(data && Object.keys(data).length) {
          Object.entries(data).forEach(([key, value])=>{
            if(!value && typeof value !== "number") return;
              //@ts-ignore
              body[key] = String(value)
          })
        } 
        return {url:`/counteragents/${id}`, method: "PUT", body: data}
      },
    }),
    deleteUserProfile: mutation<void, void>({
      query: () => ({url:"/userprofile/delete", method: "PUT", body: {}}),
      invalidatesTags: ["User"]
    }),
    getTaxSystems: query<string[], void>({
      query: () => "/userprofile/tax-systems",
      transformResponse: (response: {data: string[]})=> response?.data,
    }),
  }),
  overrideExisting: true,
})
export const {useCreateAvatarMutation, useUpdateUserProfileMutation, useDeleteUserProfileMutation, useCreateFilesMutation, useDeleteFilesMutation, useUpdateAvatarMutation, useUpdateFilesMutation, useGetTaxSystemsQuery} = usersApi;