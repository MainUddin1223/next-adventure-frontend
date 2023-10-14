import TourDetails from "@/components/ui/TourDetails/TourDetails"

type IDProps = {
    params:any
}
const PlanDetails = ({ params }: IDProps) => {

  return (
    <TourDetails id={ params.id} />
  )
}

export default PlanDetails