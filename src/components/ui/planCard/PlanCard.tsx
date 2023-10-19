import { Button, Carousel, Col } from 'antd'
import { useRouter } from 'next/navigation';
import styles from './PlanCard.module.css'
import { formateDateAndTime } from '@/services/timeFormater';
import Image from 'next/image';
import { EnvironmentOutlined } from '@ant-design/icons';

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
  return (
      <>
         <Col xs={24} sm={24} md={8} lg={6}>
              <div className={styles.plan_card_container}>
                  {
                      plan?.images.length ?
                          <Carousel>
                              {
                                  plan?.images.map((img: string, i: number) => (
                                      <div key={i}>
                                          <h3 style={contentStyle}>
                                              
                                          <Image  src={img} width={100} height={100} layout='responsive' alt='img'/>
                                          </h3>
                            </div>
                                  )) 
                              }
                          </Carousel> :
                          <Carousel>
                               <div>
                                <h3 style={contentStyle}>No image</h3>
                            </div>
                          </Carousel>
                  }
                    <div className={styles.tour_details}>
                        <h4>{ plan.plan_name}</h4>
                        <p>$ {plan.price }</p>
                        <p style={{display:"flex",gap:"10px",fontWeight:"bold"}}><EnvironmentOutlined /><span style={{textTransform:"uppercase"}}>{ plan?.destination}</span></p>
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