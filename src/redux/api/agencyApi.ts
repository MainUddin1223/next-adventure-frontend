import { baseApi } from './baseApi';

const agencyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTourPlan: build.mutation({
			query: (data) => ({
				url: `/agency/create-plan`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['agency'],
		}),
		getMyTourPlans: build.query({
			query: (arg: any) => ({
				url: `/agency/plans`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['agency'],
		}),
		getMyBookingHistory: build.query({
			query: (id: number) => ({
				url: `/agency/booking-history/${id}`,
				method: 'GET',
			}),
			providesTags: ['agency'],
		}),
		manageBookings: build.mutation({
			query: (data) => ({
				url: `/agency/booking-status/${data.id}`,
				method: 'PATCH',
				data: { status: data.status },
			}),
			invalidatesTags: ['agency'],
		}),
	}),
});

export const {
	useCreateTourPlanMutation,
	useGetMyTourPlansQuery,
	useGetMyBookingHistoryQuery,
	useManageBookingsMutation,
} = agencyApi;
