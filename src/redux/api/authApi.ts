
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
        userLogout: build.mutation({
            query: () => ({
                url: `${authUrl}/signout`,
                method: "POST"
            }),
            invalidatesTags: ['user']
        }),
        signup: build.mutation({
            query: (data) => ({
                url: `${authUrl}/signup`,
                method: "POST",
                data
            }),
            invalidatesTags: ['user']
        }),
    }),
})

export const { useUserLoginMutation, useSignupMutation, useUserLogoutMutation } = authApi