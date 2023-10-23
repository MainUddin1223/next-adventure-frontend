'use client'

import not_found_image from '@/assets/404.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PageNotFound = () => {
    const router = useRouter()
    setTimeout(() => router.back(), 2000)
    
  return (
      <div>
          <Image src={not_found_image} alt='404' width={500} height={500} style={{ maxWidth: '500px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
    </div>
  )
}

export default PageNotFound