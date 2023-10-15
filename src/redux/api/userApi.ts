
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
        })
    }),
})

export const { useBookPlanMutation } = userApi