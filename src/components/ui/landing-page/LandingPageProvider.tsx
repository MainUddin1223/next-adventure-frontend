'use client'

import { useGetAgenciesAndPlansQuery } from "@/redux/api/publicApi"
import OfferingAgency from "./Offering-agency/OfferingAgency"
import PopularAgencies from "./popular-agencies/PopularAgencies"
import Guidline from "./guidline/Guidline"
import FeaturedTour from "./Featured-tour.tsx/FeaturedTour"

const LandingPageProvider = () => {
  const { data, isLoading } = useGetAgenciesAndPlansQuery(undefined);
  if (isLoading) {
    return 'Loading'
  }
  return (
    <>
            <OfferingAgency />
      <PopularAgencies agencies={data } />
            <Guidline/>
            <FeaturedTour tours={data } />
    </>
  )
}

export default LandingPageProvider