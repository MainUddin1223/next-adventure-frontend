import { sidebarItems } from '@/constants/sidebarItems';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo } from '@/services/auth.service';
import { CloseCircleOutlined, LogoutOutlined } from '@ant-design/icons';
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
		localStorage.clear();
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
				<p
					onClick={handleLogout}
					style={{
						cursor: 'pointer',
						border: '1px solid',
						padding: '10px 20px ',
						margin: '0 auto',
						width: '97%',
						fontSize: '19px',
						fontWeight: 'bold',
						backgroundColor: 'var(--accent-color)',
						color: 'var(--primary-color)',
					}}
				>
					<LogoutOutlined style={{ fontSize: '21px', marginRight: '10px' }} />
					Logout
				</p>
			</Drawer>
		</>
	);
};

export default SmallDeviceSideBar;
