'use client'
import { isLoggedIn } from '@/services/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { ReactElement, ReactNode, useState } from 'react'
type IProtecedRoute = {
    children: ReactElement | ReactNode
}
const ProtectedWithAuth = ({ children }: IProtecedRoute) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedInUser = isLoggedIn()
    const currentRoute = usePathname();
    console.log(currentRoute)
    localStorage.setItem('redirectTo',currentRoute)
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