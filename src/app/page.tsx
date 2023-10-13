
import styles from './page.module.css'
import PublicLayout from '@/components/ui/PublicLayout'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import CoverBanner from '@/components/ui/landing-page/Landing-cover-banner/CoverBanner';
import LandingPageProvider from '@/components/ui/landing-page/LandingPageProvider';



export default function Home() {
  return (
    <PublicLayout>
      <div className={styles.parallox}>  
        <CoverBanner/>
          </div>
          <Content>
            <LandingPageProvider/>
          </Content>
    </PublicLayout>
  )
}
