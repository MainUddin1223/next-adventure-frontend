import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import AgencyCard from '../../agencyCard/AgencyCard';
import styles from './PopularAgencies.module.css';

const PopulerAgencies = ({ agencies }: any) => {
  const featuredAgencies = agencies?.agencies;
  const router = useRouter()
  return (
      <div className={styles.popular_agencies_container}>
          <h2 className={styles.header}>Populer planners</h2>
          <p style={{fontSize:'19px',marginBottom:'10px',fontWeight:'bold'}}>Find your best plan from uncountable options</p>
          <hr style={{color:"gray"}}/>
          <div className={styles.agency_card_container}>
                    <Row gutter={[24,24]}>
              {featuredAgencies?.length ?
                  featuredAgencies.map((agency: any) => (
                      <Col xs={24} sm={24} md={8} key={agency.id}>
                          <AgencyCard agency={ agency} />
              </Col>
             ))
            : <span>Coming soon</span>
              }
        </Row>
                      {
                  featuredAgencies?.length ? <Button onClick={()=>router.push('/agencies')} size="large" style={{marginTop:'20px'}} type="primary">See more <ArrowRightOutlined/></Button> : <></>
              }
          </div> 
    </div>
  )
}

export default PopulerAgencies