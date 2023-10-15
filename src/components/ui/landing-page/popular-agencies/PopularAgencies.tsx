import React from 'react'
import styles from './PopularAgencies.module.css'
import { Col, Row } from 'antd'
import AgencyCard from '../../agencyCard/AgencyCard'

const PopularAgencies = ({ agencies }: any) => {
    const featuredAgencies = agencies?.agencies
  return (
      <div className={styles.popular_agencies_container}>
          <h2>Explore most popular tour planner agencies</h2>
          <Row gutter={24}>
              {featuredAgencies?.length ?
                  featuredAgencies.map((agency: any) => (
                      <Col xs={24} sm={24} md={8} key={agency.id}>
                          <AgencyCard agency={ agency} />
              </Col>
             ))
                  : <span>Coming soon</span>
              }
          </Row>
    </div>
  )
}

export default PopularAgencies