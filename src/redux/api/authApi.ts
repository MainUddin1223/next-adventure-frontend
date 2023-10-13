
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
    }),
})

export const { useUserLoginMutation } = authApi