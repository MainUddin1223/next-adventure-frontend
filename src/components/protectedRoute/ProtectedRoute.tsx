'use client'
import {useState,useEffect, ReactElement, ReactNode} from 'react'
import LoadingSpinner from '../ui/loader/Loader'
import { isLoggedIn } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
type IProtecedRoute = {
    children: ReactElement | ReactNode
}
const ProtectedWithAuth = ({ children }: IProtecedRoute) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedInUser = isLoggedIn()

    
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     },2000)
    // }, [])
    // if (isLoading) {
    //     return (
    //         <LoadingSpinner/>
    //     )
    // }
    if (!isLoggedInUser) {
        router.push('/login')
        return
    }
  return (
      <div>
          {children}
    </div>
  )
}

export default ProtectedWithAuth