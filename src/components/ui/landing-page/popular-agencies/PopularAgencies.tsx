import React from 'react'
import styles from './PopularAgencies.module.css'
import { Col, Row } from 'antd'

const PopularAgencies = ({ agencies }: any) => {
    const featuredAgencies = agencies?.agencies
  return (
      <div className={styles.popular_agencies_container}>
          <h2>Explore most popular tour planner agencies</h2>
          <Row gutter={24}>
              {featuredAgencies?.length ?
                  featuredAgencies.map((agency: any) => (
                 <Col xs={24} sm={24} md={8} key={agency.id}>
                  <div style={{position:"relative"}}>
                      <div className={styles.popular_agency_card}>
                      <div className={styles.shadow_div}>
                      <div className={styles.agency_details}>
                            <h3>{agency?.first_name} { agency.last_name}</h3>
                            <p>{ agencies?.rating}*</p>
                      </div>
                      </div>
                  </div>
                  </div>
              </Col>
             ))
             : "Coming soon"}
          </Row>
    </div>
  )
}

export default PopularAgencies