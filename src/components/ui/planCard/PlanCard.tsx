import { Button, Carousel, Col } from 'antd'
import { useRouter } from 'next/navigation';
import styles from './PlanCard.module.css'
import { formateDateAndTime } from '@/services/timeFormater';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const PlanCard = ({ plan }: { plan: any }) => {
    const router = useRouter()
    const startingTime = formateDateAndTime(plan.starting_time)
    console.log(plan)
  return (
      <>
         <Col xs={24} sm={24} md={8} lg={6}>
            <div className={styles.plan_card_container}>
                <Carousel>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                     </div>
                         <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                </Carousel>
                    <div className={styles.tour_details}>
                        <h4>{ plan.plan_name}</h4>
                        <p>$ {plan.price }</p>
                        <p>{ plan?.starting_location}</p>
                      <p>Starts : {startingTime.time} {startingTime.date}</p>
                    </div>
                    <div>
                        <Button type="primary" style={{margin:"10px"}} onClick={()=>router.push(`/plan-details/${plan?.id}`)}>Details</Button>
                    </div>
            </div>
        </Col>
      </>
  )
}

export default PlanCard