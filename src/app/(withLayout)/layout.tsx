'use client'
import Contents from "@/components/ui/Content/Content";
import SideBar from "@/components/ui/ProfileSideBar/SidBar";
import LoadingSpinner from "@/components/ui/loader/Loader";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import styles from './layout.module.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
     const [open, setOpen] = useState(false);
    const userLoggedIn = isLoggedIn();
    const router = useRouter();
    const [isLoading,setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!userLoggedIn) {
           router.push('/login') 
        }
        setIsLoading(true)
    }, [router,isLoading])
    
    if (!isLoading) {
        return <LoadingSpinner/>
    }
  return (
      <Layout hasSider>
          <div  className={ styles.desktop_sideBar} >
              <SideBar/>
          </div>
          <Contents>
              {children}
          </Contents>
      </Layout>
  )
}

export default DashboardLayout