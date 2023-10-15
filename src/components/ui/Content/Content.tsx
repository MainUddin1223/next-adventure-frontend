'use client'
import { Layout } from 'antd';
import { usePathname } from 'next/navigation';
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
  const res = getCrumbs(currentPath)
 

  return (
    <Content style={{ minHeight: "100vh", color: 'black' }}>
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