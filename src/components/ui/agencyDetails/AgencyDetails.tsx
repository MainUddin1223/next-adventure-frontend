'use client'
import { useGetAgencyByIdQuery } from '@/redux/api/userApi';
import { Card, Row } from 'antd';
import Image from 'next/image';
import LoadingSpinner from '../loader/Loader';
import PlanCard from '../planCard/PlanCard';

const AgencyDetailsCompo = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetAgencyByIdQuery(Number(id));
 if (isLoading) {
    return <LoadingSpinner/>
  }
  return (
    <div>
      <Card>
         <div style={{maxWidth:"350px"}}>
         <Image src={data?.profile_img } alt='img' width={450} height={450} layout='responsive'/>
      </div>
      <div>
        <h2>{data?.first_name} {data?.last_name}</h2>
        <h4>{ data?.contact_no }</h4>
        <h4>Rating</h4>
        <h4>{ data?.about_user }</h4>
      </div>
     </Card>
      <Card>
        <div>
        <h2>Ongoing Tour Plans</h2>
        <div>
          <Row gutter={[25, 25]}>
          {
            data?.plans?.map((plan: any) => (
            <PlanCard plan={plan} key={plan.id}/>
            ))
        }
        </Row>
       </div>
      </div>
      </Card>
    </div>
  )
}

export default AgencyDetailsCompo