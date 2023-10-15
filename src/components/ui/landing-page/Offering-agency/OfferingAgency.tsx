'use client'
import { Col, Row } from 'antd'
import React from 'react'
import offering_agency_img from '@/assets/caption.jpg'
import Image from 'next/image'
import styles from './OfferingAgency.module.css'
import PrimaryButton from '../../buttons/PrimaryButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRightOutlined 
} from '@ant-design/icons';

const OfferingAgency = () => {
const router = useRouter()
    return (
        <div className={styles.offering_container}>
          <Row align={'middle'} justify={'center'} style={{margin:"20px 0"}} className={styles.offering_row_container}>
              <Col xs={24} sm={24} md={12} lg={12} style={{textAlign:"center"}} className={styles.offering_details_container}>
                   <h1>Choose you tour Planner</h1>
                    <h2 style={{fontSize:"1.8em"}}>Make your tour worthy</h2>
                    {/* <PrimaryButton handler={()=>router.push('/login')} value='Explore Agencies'/> */}
                    <Link href='/agencies' style={{ fontSize: "1.3em", color: "var(--button-color)" }}><h3>
                    Expolore Agencies <ArrowRightOutlined />
                    </h3> </Link>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                  <Image src={offering_agency_img} width={500} layout='responsive' alt='offeringImg' style={{borderRadius: '0 5px 5px 0'}}/>
              </Col>
         </Row>
    </div>
  )
}

export default OfferingAgency