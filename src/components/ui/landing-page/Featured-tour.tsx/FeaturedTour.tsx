'use client'
import { Col, Row, Carousel } from "antd"
import styles from './featuredToure.module.css'
import { useRouter } from "next/navigation";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const FeaturedTour = ({ tours }: any) => {
    const router = useRouter()
    const onChange = (currentSlide: number) => {
    console.log(currentSlide);
    };
    const plans = tours?.tourPlans
  return (
      <div className={styles.featured_container}>
          <h2 className={styles.featured_header}>Featured tour plan</h2>
          <div>
              <Row gutter={24}>
                  {
                      plans?.length ?
                          plans.map((plan:any) => (
                                        <Col xs={24} sm={24} md={8} lg={6} key={plan.id}>
                                            <div className={styles.plan_card_container} onClick={()=>router.push(`/plan-details/${plan?.id}`)}>
                                                <Carousel afterChange={onChange}>
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
                                          <p>{plan.price }</p>
                                          <p>{ plan?.starting_location}</p>
                                          <p>{ plan?.starting_time}</p>
                                                </div>
                                            </div>
                                        </Col>
                          ))
             : "Coming soon"
                  }
              </Row>
          </div>
    </div>
  )
}

export default FeaturedTour