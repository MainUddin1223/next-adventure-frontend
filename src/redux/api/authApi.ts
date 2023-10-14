
import { baseApi } from "./baseApi";

const authUrl = '/auth'

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${authUrl}/signin`,
                method: "POST",
                data: loginData
            }),
            invalidatesTags: ['user']
        }),
        registration: build.mutation({
            query: (data) => ({
                url: `${authUrl}/signup`,
                method: "POST",
                data
            }),
            invalidatesTags: ['user']
        }),
    }),
})

export const { useUserLoginMutation, useRegistrationMutation } = authApi