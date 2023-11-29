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
				url: `/auth/profile`,
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
			query: ({ id, status }) => ({
				url: `/user/manage-Schedule/${id}`,
				method: 'PATCH',
				params: { status },
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
				url: `/user/booking/review/${id}`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['user'],
		}),

		orderSummary: build.mutation({
			query: ({ data, id }) => ({
				url: `/user/order-summary/${id}`,
				method: 'POST',
				data,
			}),
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
	useOrderSummaryMutation,
} = userApi;
