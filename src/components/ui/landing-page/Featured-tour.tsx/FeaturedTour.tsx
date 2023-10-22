'use client'
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import { Button, Row } from "antd";
import { useRouter } from "next/navigation";
import PlanCard from "../../planCard/PlanCard";
import styles from './featuredTour.module.css';

const FeaturedTour = ({ tours }: any) => {
    const router = useRouter()
    const plans = tours?.tourPlans
  return (
      <div className={styles.featured_container} >
          <h2 className={styles.featured_header}>Featured Plans</h2>
          <p style={{fontSize:'19px',marginBottom:'10px',fontWeight:'bold'}}>Find your best plan from uncountable options</p>
          <hr style={{color:"gray"}}/>
          <div style={{margin:"20px auto"}} className={styles.plan_card_container}>
              <Row gutter={[24,24]}>
                  {
                      plans?.length ?
                          <>
                          { plans.map((plan:any) => (
                              <PlanCard plan={ plan} key={plan.id}/>
                          ))}
                          </>
             : <span>Coming soon</span>
            }
              </Row>
              {
                  plans?.length ? <Button onClick={()=>router.push('/plans')} size="large" style={{marginTop:'20px'}} type="primary">See more <ArrowRightOutlined/></Button> : <></>
              }
            
          </div>
    </div>
  )
}

export default FeaturedTour