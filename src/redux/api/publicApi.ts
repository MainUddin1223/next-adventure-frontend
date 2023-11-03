import { baseApi } from './baseApi';

const publicApi = baseApi.injectEndpoints({
	endpoints: (build: any) => ({
		getAgenciesAndPlans: build.query({
			query: () => ({
				url: `/user/agency-plans`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),

		getAgencies: build.query({
			query: (arg: any) => ({
				url: `/user/agencies`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['user'],
		}),

		getTourPlans: build.query({
			query: (arg: any) => ({
				url: `/user/tour-plans`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['user'],
		}),

		getPlanDetails: build.query({
			query: (id: number) => ({
				url: `/user/plan-details/${id}`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
	}),
});

export const {
	useGetAgenciesAndPlansQuery,
	useGetPlanDetailsQuery,
	useGetAgenciesQuery,
	useGetTourPlansQuery,
} = publicApi;
