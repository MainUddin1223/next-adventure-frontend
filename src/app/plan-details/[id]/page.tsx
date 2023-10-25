import ProtectedWithAuth from "@/components/protectedRoute/ProtectedRoute"
import PlanDetail from "@/components/ui/PlanDetails/PlanDetails"

type IDProps = {
    params:any
}
const PlanDetails = ({ params }: IDProps) => {
 

  return (
    <ProtectedWithAuth>
      <PlanDetail id={params.id} />
      </ProtectedWithAuth>
  )
}

export default PlanDetails