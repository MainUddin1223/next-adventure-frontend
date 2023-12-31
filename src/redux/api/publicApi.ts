import { baseApi } from './baseApi';

const publicApi = baseApi.injectEndpoints({
	endpoints: (build: any) => ({
		getLandingPageData: build.query({
			query: () => ({
				url: `/user/data`,
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
				url: `/user/plans`,
				method: 'GET',
				params: arg,
			}),
			providesTags: ['user'],
		}),

		getPlanDetails: build.query({
			query: (id: number) => ({
				url: `/user/plans/${id}`,
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
	}),
});

export const {
	useGetLandingPageDataQuery,
	useGetPlanDetailsQuery,
	useGetAgenciesQuery,
	useGetTourPlansQuery,
} = publicApi;
