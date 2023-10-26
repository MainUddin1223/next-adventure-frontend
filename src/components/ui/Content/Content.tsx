'use client'
import { useUserLogoutMutation } from '@/redux/api/authApi';
import {
  HomeFilled,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

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
            <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent:"end",
          backgroundColor:'var(--primary-color)'
        }}
      >
        <div style={{display:"flex",gap:"20px",fontSize:"30px",color:"white"}}>
          <HomeFilled style={{cursor:"pointer"}} onClick={()=>router.push('/')}/>
          <LogoutOutlined style={{cursor:"pointer"}} onClick={handleLogout}/>
        </div>
      </Header>
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