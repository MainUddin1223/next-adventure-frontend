import guidLineImg from '@/assets/book-blog.jpg';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Guideline.module.css';

const Guideline = () => {
  const router = useRouter()
  return (
      <div className={styles.guideline_container}>
          <Image src={guidLineImg} width={100} layout='responsive' alt='guideline' />
          <div className={styles.guideline_details}>
              <h2>User Guideline</h2>
              <h3>Make your booking process easier</h3>
              <Button onClick={()=>router.push('/agencies')} type='primary' size='large' style={{marginTop:'10px'}}>Read more</Button>
          </div>
    </div>
  )
}

export default Guideline