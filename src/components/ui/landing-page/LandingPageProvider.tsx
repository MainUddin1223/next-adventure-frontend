'use client'

import { useGetAgenciesAndPlansQuery } from "@/redux/api/publicApi"
import OfferingAgency from "./Offering-agency/OfferingAgency"
import PopularAgencies from "./popular-agencies/PopularAgencies"
import Guidline from "./guidline/Guidline"
import FeaturedTour from "./Featured-tour.tsx/FeaturedTour"
import SkeletonLoader from "../Skeleton/Skeleton"

const LandingPageProvider = () => {
  const { data, isLoading } = useGetAgenciesAndPlansQuery(undefined);
  if (isLoading) {
    return (
      <div style={{margin:"10px"}}>
        <SkeletonLoader items={4}/>
      </div>
      )
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