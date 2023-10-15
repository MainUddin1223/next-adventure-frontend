
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        bookPlan: build.mutation({
            query: (data) => ({
                url: `/user/book-plan`,
                method: "POST",
                data
            }),
            invalidatesTags: ['user']
        }),
        getAgencyById: build.query({
            query: (id) => ({
                url: `/user/agency/${id}`,
                method: "GET",
            }),
            providesTags: ['user']
        }),
        getUserProfile: build.query({
            query: () => ({
                url: `/auth/profile`,
                method: "GET",
            }),
            providesTags: ['user']
        })
    }),
})

export const { useBookPlanMutation, useGetAgencyByIdQuery, useGetUserProfileQuery } = userApi