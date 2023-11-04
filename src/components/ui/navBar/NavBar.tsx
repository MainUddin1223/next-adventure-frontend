'use client';
import logo from '@/assets/travel-logo.png';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Layout } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DesktopNavBar from './DesktopNavBar';
import MobileNavBar from './MobileNavBar';
import styles from './NavBar.module.css';
const { Header } = Layout;

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const [userLogout] = useUserLogoutMutation();
	const { role } = getUserInfo() as any;
	const router = useRouter();
	const profile_img =
		typeof window !== 'undefined' ? localStorage.getItem('profile_img') : null;
	const isUser = isLoggedIn();

	const handleLogout = async () => {
		await userLogout(undefined);
		localStorage.clear();
		setOpen(false);
		router.push('/');
	};

	return (
		<>
			<Header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					padding: 0,
					backgroundColor: 'var(--accent-color)',
				}}
			>
				<div className={styles.landscape_container}>
					<span className={styles.desktop_header_container}>
						<Image
							style={{ cursor: 'pointer' }}
							src={logo}
							height={40}
							alt="logo"
							onClick={() => router.push(`/`)}
						/>
						<DesktopNavBar
							role={role}
							profile_img={profile_img}
							isUser={isUser}
							logout={handleLogout}
						/>
					</span>
				</div>
				<span>
					<MobileNavBar
						role={role}
						profile_img={profile_img}
						isUser={isUser}
						logout={handleLogout}
					/>
				</span>
			</Header>
		</>
	);
};

export default NavBar;
