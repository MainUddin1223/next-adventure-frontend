import ProtectedWithAuth from "@/components/protectedRoute/ProtectedRoute"
import TourDetails from "@/components/ui/TourDetails/TourDetails"

type IDProps = {
    params:any
}
const PlanDetails = ({ params }: IDProps) => {
 

  return (
    <ProtectedWithAuth>
      <TourDetails id={params.id} />
      </ProtectedWithAuth>
  )
}

export default PlanDetails