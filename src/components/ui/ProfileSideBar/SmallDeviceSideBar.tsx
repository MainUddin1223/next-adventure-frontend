import { sidebarItems } from '@/constants/sidebarItems';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo } from '@/services/auth.service';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { useRouter } from 'next/navigation';

export type ISideBarProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const SmallDeviceSideBar = ({ open, setOpen }: ISideBarProps) => {
	const { role } = getUserInfo() as any;
	const [userLogout] = useUserLogoutMutation();
	const router = useRouter();

	const onClose = () => {
		setOpen(false);
	};

	const handleLogout = async () => {
		await userLogout(undefined);
		typeof window !== 'undefined' && localStorage.clear();
		onClose();
		router.push('/');
	};

	return (
		<>
			<Drawer
				title=""
				placement="left"
				onClose={onClose}
				closeIcon={
					<CloseCircleOutlined
						style={{ fontSize: '35px', color: 'var(--button-color)' }}
					/>
				}
				open={open}
			>
				<Menu
					onClick={onClose}
					style={{
						fontSize: '19px',
						fontWeight: 'bold',
						backgroundColor: 'var(--accent-color)',
						color: 'var(--primary-color)',
					}}
					defaultSelectedKeys={['1']}
					mode="inline"
					items={sidebarItems(role)}
				/>
			</Drawer>
		</>
	);
};

export default SmallDeviceSideBar;
