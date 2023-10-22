'use client'

import cover_location_icon_1 from '@/assets/cover-logo-1.png'
import cover_location_icon_2 from '@/assets/cover-logo-2.png'
import cover_location_icon_3 from '@/assets/cover-logo-3.png'
import cover_location_icon_4 from '@/assets/cover-logo-4.png'
import cover_location_icon_5 from '@/assets/cover-logo-5.png'
import { useAppDispatch, useDebounced } from '@/redux/hooks'
import { serachValueState } from '@/redux/slice/planSlice'
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Tooltip } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './Hero.module.css'
const { Search } = Input;

const Hero = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: Record<string, any> = {}
  
  
  
    const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay:2000
  })
  if (!!debouncedTerm) {
    dispatch(serachValueState(debouncedTerm))
    router.push('/plans')
  }

  const handleLocation = (location: string) => {
    dispatch(serachValueState(location));
     router.push('/plans')
  }

  return (
    <div className={styles.parallox}>
        <div className={styles.mobile_cover_banner}>
        <div style={{width:'75%',display:"block",margin:'20px auto'}}>
           <Input
          type='text'
          size='large'
            placeholder='Search ... '
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined style={{color:'gray'}}/>}
        />
           </div>
        <div className={styles.bannner_info}>
          <h1>Enjoy your Holidays</h1>
          <h2 >Find the best plan from the uncountable options</h2>
        </div>
        <Button style={{display:"block",margin:'20px auto'}} size='large' type='primary' onClick={()=>router.push('/agencies')}>Explore Us <ArrowRightOutlined /></Button>
       </div>
    <div className={styles.cover_banner}>
      <h1>Explore before it is too late</h1>
      <div className={styles.search_field}>
            <Input
          type='text'
          size='large'
          placeholder='Search ... '
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
            </div>
        <div className={styles.cover_location_container} >

        <Tooltip title="Mohamaya"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('mohamaya')}>
          <Image src={cover_location_icon_1} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Kuakata"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('kuakata')}>
          <Image src={cover_location_icon_2} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Sajek"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('sajek')}>
          <Image src={cover_location_icon_3} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Sant-martin"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('sant martin')}>
          <Image src={cover_location_icon_4} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
          </Tooltip>
        <Tooltip title="Sant-martin"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('sant martin')}>
          <Image src={cover_location_icon_4} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
        </Tooltip>
        <Tooltip title="Nijum deep"  color='var(--primary-color)' key='white'>
        <div className={styles.cover_location} onClick={()=>handleLocation('sajek')}>
          <Image src={cover_location_icon_5} width={70} height={70} alt='cover-location' className={styles.cover_location_image} />
          </div>
          </Tooltip>
      </div>

      </div>
        </div>
  )
}

export default Hero