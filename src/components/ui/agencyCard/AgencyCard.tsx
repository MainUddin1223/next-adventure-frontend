import { Rate } from 'antd'
import { useRouter } from 'next/navigation'
import styles from './AgencyStyle.module.css'

type IAgencyType = {
    agency:any
}

const AgencyCard = ({ agency }: IAgencyType) => {
  const router = useRouter();
  const agencyFullName =  `${agency?.first_name} ${agency?.last_name}`
  return (
                  <div style={{ position: "relative" }} onClick={()=>router.push(`/agencies/${agency.id}`)}>
                      <div className={styles.popular_agency_card} style={{backgroundImage: `url(${agency?.profile_img})`}}>
                      <div className={styles.shadow_div}>
                      <div className={styles.agency_details}>
                            <h3>{agencyFullName.substring(0,15)}</h3>
                            <Rate disabled defaultValue={4} />
                      </div>
                      </div>
                  </div>
                  </div>
  )
}

export default AgencyCard