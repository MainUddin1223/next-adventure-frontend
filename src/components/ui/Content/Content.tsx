'use client'
import { useUserLogoutMutation } from '@/redux/api/authApi';
import {
  HomeFilled,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import SmallDeviceSideBar from '../ProfileSideBar/SmallDeviceSideBar';
import styles from './Content.module.css';

const { Content } = Layout;


const getCrumbs = (currentPath: string) => {
  let items: any = [];
  const paths = currentPath.split("/");
  let prevPath: string;
  
    paths.map((path) => {
      if (!path) {
        prevPath = ''
      }
      else{
        prevPath = `${prevPath}/${path}`
        items.push({
          label: path,
          link:`${prevPath}`
        })
      }
    })
  items.pop()
  return items
}

const Contents = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  const [userLogout] = useUserLogoutMutation()
  const res = getCrumbs(currentPath)
  const router = useRouter()

 const handleLogout = async() => {
    await userLogout(undefined);
    localStorage.clear();
    router.push('/')

  }
 

  return (
    <Content style={{ minHeight: "100vh", color: 'black' }}>
      <Header className={styles.header_container}>
        
        {/* desktop nav bar */}

        <div className={styles.nav_container}>
          <HomeFilled style={{cursor:"pointer"}} onClick={()=>router.push('/')}/>
          <LogoutOutlined style={{cursor:"pointer"}} onClick={handleLogout}/>
        </div>

        {/* mobile nav bar */}
        
        <div className={styles.nav_container_mobile} >
          <MenuOutlined  style={{cursor:"pointer"}} onClick={()=>setOpen(true)}/>
        </div>
      </Header>
      <div>
        <SmallDeviceSideBar open={open } setOpen={setOpen} />
      </div>
      <div style={{padding:"15px"}}>
         <BreadCrumb
      items={
        res
    }
    />
      {children}
   </div>
    </Content>
  )
}

export default Contents