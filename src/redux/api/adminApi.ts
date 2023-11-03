import { baseApi } from './baseApi';

const adminApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllAgencies: build.query({
			query: (arg: any) => ({
				url: `/admin/agencies`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['admin', 'super_admin'],
		}),
		getAllUsers: build.query({
			query: (arg: any) => ({
				url: `/admin/users`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['admin', 'super_admin'],
		}),
		getAllAdmins: build.query({
			query: (arg: any) => ({
				url: `/admin/admins`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['super_admin'],
		}),
		getAllPlans: build.query({
			query: (arg: any) => ({
				url: `/admin/tour-plans`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['admin', 'super_admin'],
		}),
		getBookingHistory: build.query({
			query: (arg: any) => ({
				url: `/admin/booking-history`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['admin', 'super_admin'],
		}),
		getPayouts: build.query({
			query: (arg: any) => ({
				url: `/admin/payouts`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['super_admin'],
		}),
		payoutRelase: build.mutation({
			query: (id: number) => ({
				url: `/admin/payouts/${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['super_admin'],
		}),
		handleAdmin: build.mutation({
			query: (payload) => ({
				url: `/admin/create-admin/${payload.id}`,
				method: 'PATCH',
				data: payload,
			}),
			invalidatesTags: ['super_admin'],
		}),
	}),
});

export const {
	useGetAllAgenciesQuery,
	useGetAllPlansQuery,
	useGetBookingHistoryQuery,
	useGetPayoutsQuery,
	usePayoutRelaseMutation,
	useGetAllAdminsQuery,
	useGetAllUsersQuery,
	useHandleAdminMutation,
} = adminApi;
