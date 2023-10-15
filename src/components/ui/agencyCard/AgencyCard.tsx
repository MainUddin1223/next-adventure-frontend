import React from 'react'
import styles from './AgencyStyle.module.css'

type IAgencyType = {
    agency:any
}

const AgencyCard = ({ agency }: IAgencyType) => {
  return (
                  <div style={{ position: "relative" }}>
                      <div className={styles.popular_agency_card}>
                      <div className={styles.shadow_div}>
                      <div className={styles.agency_details}>
                            <h3>{agency?.first_name} { agency.last_name}</h3>
                            <p>*</p>
                      </div>
                      </div>
                  </div>
                  </div>
  )
}

export default AgencyCard