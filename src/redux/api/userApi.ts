import { baseApi } from './baseApi';

const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		bookPlan: build.mutation({
			query: ({ data, id }) => ({
				url: `/user/book-plan/${id}`,
				method: 'POST',
				data: data,
			}),
			invalidatesTags: ['user'],
		}),
		getAgencyById: build.query({
			query: (id) => ({
				url: `/user/agencies/${id}`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
		getUserProfile: build.query({
			query: () => ({
				url: `/auth/profile`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
		updateUserProfile: build.mutation({
			query: (data) => ({
				url: `/auth/profile/update`,
				method: 'PATCH',
				data,
			}),
			invalidatesTags: ['user'],
		}),
		getUpcomingSchedules: build.query({
			query: () => ({
				url: `/user/upcoming-schedule`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
		bookingHistory: build.query({
			query: (arg: any) => ({
				url: `/user/bookings`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['user'],
		}),
		manageBookings: build.mutation({
			query: (id) => ({
				url: `/user/manage-booking/${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['user'],
		}),
		leaveReview: build.mutation({
			query: (data) => ({
				url: `/user/review`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['user'],
		}),
		reviewPlan: build.mutation({
			query: ({ data, id }) => ({
				url: `/user/plan-review/${id}`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['user'],
		}),
	}),
});

export const {
	useBookPlanMutation,
	useGetAgencyByIdQuery,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	useGetUpcomingSchedulesQuery,
	useManageBookingsMutation,
	useBookingHistoryQuery,
	useLeaveReviewMutation,
	useReviewPlanMutation,
} = userApi;
