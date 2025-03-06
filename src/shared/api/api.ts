import { RootState } from "@app/store";
import {createApi, fetchBaseQuery }from "@reduxjs/toolkit/query/react"

const baseUrl = "https://admin.agrozernovoz.ru/api/v1";

export const baseApi = createApi({
	tagTypes: ["Applications", "UserApplications", "User", "Docs"],
  baseQuery: fetchBaseQuery({baseUrl, prepareHeaders: (headers, {getState})=>{
    const state = getState() as RootState;

		const token = state.auth.token;

		headers.set('Accept', "application/json")
		// headers.set("Content-Type", "application/json")

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		
		return headers;
  }}),
  endpoints: ()=>({}),
})