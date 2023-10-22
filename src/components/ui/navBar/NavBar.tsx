'use client'
import logo from '@/assets/travel-logo.png';
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './NavBar.module.css';
const { Header, Content, Footer } = Layout;

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
          backgroundColor: "var(--primary-color)",
          padding:'0 10px'
      }}>
      <span className={styles.header_container}>
        <div>
          <Link href='/'>
            <Image src={logo} height={40} alt="logo" style={{display:'flex'}}/>
          </Link>
          </div>
          {
            !isUser || role == 'user' ? <div>
                      <div className={styles.navigation_item_container}>
       <Link href='/agencies' className={styles.navigation_item}> <p>Agencies</p></Link>
          <Link href='/plans' className={styles.navigation_item}> <p>Tour plans</p></Link>
          {
                  isUser ?
                    <>
                     <Link href={`/${role}/schedules`} className={styles.navigation_item}> <p>My plans</p></Link>
                      <Link href={`/${role}/profile`} className={styles.navigation_item}>
                         <UserOutlined style={{fontSize:"20px",padding:"5px",color:"white",cursor:"pointer"}}/>
                     </Link>
                    
                    </> :
              <>
              <Link href='/login' className={styles.navigation_item}>Login</Link>
              </>
          }
        </div>
            </div> :
              <div>
        <div className={styles.navigation_item_container}>
       <Link href={`${role}/profile`} className={styles.navigation_item}> <p>Dashboard</p></Link>
             <UserOutlined style={{fontSize:"20px",padding:"5px",color:"white",cursor:"pointer"}} onClick={()=>router.push(`${role}/profile`)}/> 
        </div>
              </div>
          }
          
          {/* mobile navbar */}
        <div className={styles.drawer_container}>
          <UnorderedListOutlined onClick={showDrawer} style={{fontSize:"35px",display:"flex",alignItems:"center",marginTop:"10px"}}/>
            <Drawer title="Next Adventure" placement="left" onClose={onClose} open={open}>
              {
                !isUser || role == 'user' ? <>
                           <Link href='/' className={styles.navigation_item}> <p>Agencies</p></Link>
                            <Link href='/' className={styles.navigation_item}> <p>Tour plans</p></Link>
                            <Link href={`${role}/schedules`} className={styles.navigation_item}> <p>My plans</p></Link>
          {
            isUser ?
             <span><UserOutlined style={{fontSize:"20px",padding:"5px"}}/></span> :
              <>
              <Link href='/login' className={styles.navigation_item}>Login</Link>
              <Link href='/signup' className={styles.navigation_item}>Sign up</Link>
              </>
          }
                </> : <>
                     <Link href={`${role}/profile`} className={styles.navigation_item}> <p>Dashboard</p></Link>
             <UserOutlined style={{fontSize:"20px",padding:"5px",color:"white",cursor:"pointer"}} onClick={()=>router.push(`${role}/profile`)}/> 
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