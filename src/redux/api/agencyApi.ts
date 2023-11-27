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
			query: ({ id, status }) => ({
				url: `/agency/manage-booking/${id}`,
				method: 'PATCH',
				params: { status },
			}),
			invalidatesTags: ['agency'],
		}),
		getPlanById: build.query({
			query: (id) => ({
				url: `/agency/plan/${id}`,
				method: 'GET',
			}),
			providesTags: ['agency'],
		}),
		updatePlanById: build.mutation({
			query: (data) => ({
				url: `/agency/plan/${data.id}`,
				method: 'PATCH',
				data: { ...data.updatedData },
			}),
			invalidatesTags: ['agency'],
		}),
		getPayouts: build.query({
			query: (status) => ({
				url: `/agency/payouts`,
				method: 'GET',
				params: { status },
			}),
		}),
	}),
});

export const {
	useCreateTourPlanMutation,
	useGetMyTourPlansQuery,
	useGetMyBookingHistoryQuery,
	useManageBookingsMutation,
	useGetPlanByIdQuery,
	useUpdatePlanByIdMutation,
	useGetPayoutsQuery,
} = agencyApi;
