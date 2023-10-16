'use client'
import { Layout, Drawer,Flex } from "antd";
const { Header, Content, Footer } = Layout;
import {UserOutlined,UnorderedListOutlined } from '@ant-design/icons';
import styles from './NavBar.module.css'
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/travel-logo.png'
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { role } = getUserInfo() as any;
  const router = useRouter()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const isUser = isLoggedIn()
  return (
    <>
         <Header
          style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor:"var(--primary-color)"
      }}>
      <span className={styles.header_container}>
        <div>
          <Link href='/'>
            <Image src={logo} height={45} alt="logo" style={{display:'flex'}}/>
          </Link>
      </div>
        <div className={styles.navigation_item_container}>
       <Link href='/agencies' className={styles.navigation_item}> <p>Agencies</p></Link>
          <Link href='/plans' className={styles.navigation_item}> <p>Tour plans</p></Link>
          <Link href='/profile' className={styles.navigation_item}> <p>My plans</p></Link>
          {/* <Button type="primary">Login</Button> */}
          {
            isUser ?
             <UserOutlined style={{fontSize:"20px",padding:"5px",color:"white",cursor:"pointer"}} onClick={()=>router.push(`${role}/profile`)}/> :
              <>
              <Link href='/login' className={styles.navigation_item}>Login</Link>
              <Link href='/login' className={styles.navigation_item}>Sign In</Link>
              </>
          }
          
          
        </div>
        <div className={styles.drawer_container}>
             {/* <Button type="primary" onClick={showDrawer}>Open
          </Button> */}
          <UnorderedListOutlined onClick={showDrawer} style={{fontSize:"35px",display:"flex",alignItems:"center",marginTop:"10px"}}/>
          <Drawer title="Basic Drawer" placement="left" onClose={onClose} open={open}>
         <Link href='/' className={styles.navigation_item}> <p>Agencies</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>Tour plans</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>My plans</p></Link>
          {/* <Button type="primary">Login</Button> */}
          {
            isUser ?
             <span><UserOutlined style={{fontSize:"20px",padding:"5px"}}/></span> :
              <>
              <Link href='/login' className={styles.navigation_item}>Login</Link>
              <Link href='/login' className={styles.navigation_item}>Sign In</Link>
              </>
          }
      </Drawer>
        </div>

      </span>

    </Header>
    </>
 
  )
}

export default NavBar