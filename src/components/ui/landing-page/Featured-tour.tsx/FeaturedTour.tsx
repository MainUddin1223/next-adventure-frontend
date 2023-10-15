'use client'
import { Col, Row, Carousel, Button } from "antd"
import styles from './featuredToure.module.css'
import { useRouter } from "next/navigation";
import PlanCard from "../../planCard/PlanCard";
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
    const plans = tours?.tourPlans
  return (
      <div className={styles.featured_container}>
          <h2 className={styles.featured_header}>Featured tour plan</h2>
          <div>
              <Row gutter={24}>
                  {
                      plans?.length ?
                          plans.map((plan:any) => (
                              <PlanCard plan={ plan} key={plan.id}/>
                          ))
             : <span>Coming soon</span>
                  }
              </Row>
          </div>
    </div>
  )
}

export default FeaturedTour