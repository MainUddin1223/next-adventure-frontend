import ProtectedWithAuth from "@/components/protectedRoute/ProtectedRoute"
import PublicLayout from "@/components/ui/PublicLayout"
import AgencyDetailsCompo from "@/components/ui/agencyDetails/AgencyDetails"

type IDProps = {
    params:any
}
const AgencyDetails = ({ params }: IDProps) => {
  return (
    <PublicLayout>
       <ProtectedWithAuth>
        <div style={{margin:"10px"}}>
          <AgencyDetailsCompo id={params.id}/>
        </div>
      </ProtectedWithAuth>
      </PublicLayout>
  )
}

export default AgencyDetails