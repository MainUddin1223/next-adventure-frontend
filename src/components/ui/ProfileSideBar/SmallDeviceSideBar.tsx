import { sidebarItems } from '@/constants/sidebarItems';
import { getUserInfo } from '@/services/auth.service';
import { Drawer, Menu } from 'antd';


export type ISideBarProps = {
    open: boolean;
    setOpen:(open:boolean)=>void
}


const SmallDeviceSideBar = ({open,setOpen}:ISideBarProps) => {
        const { role } = getUserInfo() as any;

  const onClose = () => {
    setOpen(false);
  };
    return (
        <>
        <Drawer title="Next Adventure" placement="left" onClose={onClose} open={open}>
        <Menu style={{backgroundColor:"var(--primary-color)",color:'white'}} defaultSelectedKeys={['1']} mode="inline" items={sidebarItems(role)} />
      </Drawer>
      </>
  )
}

export default SmallDeviceSideBar