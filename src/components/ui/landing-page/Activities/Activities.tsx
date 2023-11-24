import book_icon from '@/assets/book-icon.png';
import manage_icon from '@/assets/manage-icon.png';
import search_icon from '@/assets/search-icon.png';
import share_icon from '@/assets/share-icon.png';
import Image from 'next/image';
import styles from './activities.module.css';

const Activities = () => {

  return (
      <div className={styles.container}>
          <div className={styles.activities_container}> 
          <div className={styles.activities_image_container}>
              <Image src={search_icon} alt='search_icon' width={20} height={20} layout='responsive'/>
              </div>
              <h3>Find Tour Plans</h3>
          </div>
          <div className={styles.activities_container}> 
              <div className={styles.activities_image_container}>
                  <Image src={book_icon} alt='book_icon' width={50} height={50} layout='responsive' />
              </div>
              <h3>Book Plans</h3>
          </div>
            <div className={styles.activities_container}> 
              <div className={styles.activities_image_container}>
                  <Image src={manage_icon} alt='manage_icon' width={50} height={50} layout='responsive' />
              </div>
              <h3>Manage Plans</h3>
          </div>
            <div className={styles.activities_container}> 
              <div className={styles.activities_image_container}>
                  <Image src={share_icon} alt='share_icon' width={50} height={50} layout='responsive' />
              </div>
              <h3>Share Experience</h3>
          </div>
    </div>
  )
}

export default Activities