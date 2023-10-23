import CardListLayout from '@/components/ui/CardListLayout/CardListLayout'
import PublicLayout from '@/components/ui/PublicLayout'
import TourPlanContainer from '@/components/ui/plans/TourPlanContainer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plans | Next Adventure',
  description: 'Generated by create next app',
}

const Plans = () => {
  return (
        <>
      <PublicLayout>
        <div>
          <CardListLayout title='TOUR PLANS' description='Find the best tour plan from thousends of options'>
            <TourPlanContainer />
          </CardListLayout>
          </div>
    </PublicLayout>
      </>
  )
}

export default Plans