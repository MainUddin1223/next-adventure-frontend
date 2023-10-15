import PublicLayout from '@/components/ui/PublicLayout'
import TourPlanContainer from '@/components/ui/plans/TourPlanContainer'
import React from 'react'

const Plans = () => {
  return (
        <>
      <PublicLayout>
          <div>
             <TourPlanContainer/>
          </div>
    </PublicLayout>
      </>
  )
}

export default Plans