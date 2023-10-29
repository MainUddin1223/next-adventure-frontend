import { sidebarItems } from '@/constants/sidebarItems';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, Drawer, Menu } from 'antd';
import { useRouter } from 'next/navigation';


export type ISideBarProps = {
    open: boolean;
    setOpen:(open:boolean)=>void
}


const SmallDeviceSideBar = ({open,setOpen}:ISideBarProps) => {
  const { role } = getUserInfo() as any;
  const [userLogout] = useUserLogoutMutation();
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = async() => {
        await userLogout(undefined);
        localStorage.clear();
        onClose()
        router.push('/');
  }

    return (
        <>
        <Drawer title="Next Adventure" placement="left" onClose={onClose} open={open}>
        <Menu onClick={onClose} style={{backgroundColor:"var(--primary-color)",color:'white'}} defaultSelectedKeys={['1']} mode="inline" items={sidebarItems(role)} />
        <Button onClick={handleLogout} type='primary' size='large' style={{width:'97%', display:'block',margin:"15px auto"}}>Logout</Button>
        </Drawer>
      </>
  )
}

export default SmallDeviceSideBar