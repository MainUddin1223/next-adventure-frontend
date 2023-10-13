import React from 'react';
import guidLineImg from'@/assets/book-blog.jpg'
import Image from 'next/image';
import { Button } from 'antd';
import styles from './guideline.module.css'

const Guidline = () => {
  return (
      <div className={styles.guideline_container}>
          <Image src={guidLineImg} width={100} layout='responsive' alt='guideline' />
          <div className={styles.guideline_details}>
              <h2>User Guideline</h2>
              <h3>Make your booking process easier</h3>
              <Button>Read more</Button>
          </div>
    </div>
  )
}

export default Guidline