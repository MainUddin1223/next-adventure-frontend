'use client'
import { Layout, Button, Drawer,Flex } from "antd";
const { Header, Content, Footer } = Layout;
import {UserOutlined,UnorderedListOutlined } from '@ant-design/icons';
import styles from './NavBar.module.css'
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/travel-logo.png'
import { isLoggedIn } from "@/services/auth.service";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const isUser = isLoggedIn()
  return (
    <Header
          style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor:"var(--primary-color)"
      }}>
      <div className={styles.header_container}>
        <div>
          <Link href='/'>
            <Image src={logo} height={45} alt="logo" style={{display:'flex'}}/>
          </Link>
      </div>
        <div className={styles.navigation_item_container}>
          <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          {/* <Button type="primary">Login</Button> */}
          {
            isUser ?
             <UserOutlined style={{fontSize:"20px",padding:"5px"}}/> :
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
         <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          <Link href='/' className={styles.navigation_item}> <p>Packages</p></Link>
          {/* <Button type="primary">Login</Button> */}
          {
            isUser ?
             <UserOutlined style={{fontSize:"20px",padding:"5px"}}/> :
              <>
              <Link href='/login' className={styles.navigation_item}>Login</Link>
              <Link href='/login' className={styles.navigation_item}>Sign In</Link>
              </>
          }
      </Drawer>
        </div>

      </div>

    </Header>
  )
}

export default NavBar