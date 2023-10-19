
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
        }),
        updateUserProfile: build.mutation({
            query: (data) => ({
                url: `/auth/profile/update`,
                method: "PATCH",
                data
            }),
            invalidatesTags: ['user']
        }),
        getUpcomingSchedules: build.query({
            query: () => ({
                url: `/user/upcoming-schedules`,
                method: "GET",
            }),
            providesTags: ['user']
        }),
        bookingHistory: build.query({
            query: (arg: any) => ({
                url: `/user/booking-history`,
                method: "GET",
                params: arg
            }),
            providesTags: ['user']
        }),
        manageBookings: build.mutation({
            query: (id) => ({
                url: `/user/manage-booking/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['user']
        }),
        leaveReview: build.mutation({
            query: (data) => ({
                url: `/user/review`,
                method: "POST",
                data
            }),
            invalidatesTags: ['user']
        })
    }),
})

export const {
    useBookPlanMutation,
    useGetAgencyByIdQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetUpcomingSchedulesQuery,
    useManageBookingsMutation,
    useBookingHistoryQuery,
    useLeaveReviewMutation
} = userApi