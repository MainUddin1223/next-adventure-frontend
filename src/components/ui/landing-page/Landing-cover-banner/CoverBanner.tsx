'use client'

import Form from '@/components/form/Form';
import cover_location_icon_1 from '@/assets/cover-logo-1.png'
import cover_location_icon_2 from '@/assets/cover-logo-2.png'
import cover_location_icon_3 from '@/assets/cover-logo-3.png'
import cover_location_icon_4 from '@/assets/cover-logo-4.png'
import cover_location_icon_5 from '@/assets/cover-logo-5.png'
import FormInput from '@/components/form/FormInput'
import { FormValues } from '@/components/types'
import { SubmitHandler } from 'react-hook-form';
import styles from './coverBanner.module.css'
import Image from 'next/image';
import { Button, Input, Tooltip } from 'antd';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';

const CoverBanner = () => {
   const [searchTerm, setSearchTerm] = useState<string>('');
  
    const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay:300
  })
  if (!!debouncedTerm) {
    console.log(searchTerm)
  }

  return (
    <div className={styles.cover_banner}>
      <h1>Explore before it is too late</h1>
                 <div
        className={styles.search_field}
            >
            <Input
          type='text'
          size='large'
          placeholder='Search ... '
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
            </div>
      <div className={styles.cover_location_container}>

        <Tooltip title="Mohamaya"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_1} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Kuakata"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_2} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Sajek"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_3} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Sant-martin"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_4} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
          </Tooltip>
        <Tooltip title="Sant-martin"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_4} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Nijum deep"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location}>
          <Image src={cover_location_icon_5} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
          </Tooltip>
      </div>

    </div>
  )
}

export default CoverBanner