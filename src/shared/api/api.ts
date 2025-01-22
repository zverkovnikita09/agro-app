import { RootState } from "@app/store";
import {createApi, fetchBaseQuery }from "@reduxjs/toolkit/query/react"

const baseUrl = "https://agro-back.pisateli-studio.ru/api/v1";

export const baseApi = createApi({
	tagTypes: ["Applications", "UserApplications"],
  baseQuery: fetchBaseQuery({baseUrl,  headers: {'Accept': 'application/json'}, prepareHeaders: (headers, {getState})=>{
    const state = getState() as RootState;

		const token = state.auth.token;

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		return headers;
  }}),
  endpoints: ()=>({}),
})