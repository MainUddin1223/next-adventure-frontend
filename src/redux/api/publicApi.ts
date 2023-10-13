
import { baseApi } from "./baseApi";

const publicApi = baseApi.injectEndpoints({
    endpoints: (build: any) => ({
        getAgenciesAndPlans: build.query({
            query: () => ({
                url: `/user/agency-plans`,
                method: "GET"
            }),
            providesTags: ['user']
        }),
    }),
})

export const { useGetAgenciesAndPlansQuery } = publicApi