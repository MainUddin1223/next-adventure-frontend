'use client';
import logo from '@/assets/travel-logo.png';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import {
	CloseCircleOutlined,
	MenuOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Drawer, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DesktopNavBar from './DesktopNavBar';
import styles from './NavBar.module.css';
const { Header } = Layout;

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const [userLogout] = useUserLogoutMutation();
	const { role } = getUserInfo() as any;
	const router = useRouter();
	const profile_img =
		typeof window !== 'undefined' ? localStorage.getItem('profile_img') : null;

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};
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
					backgroundColor: 'var(--accent-color)',
					padding: '0 10px',
				}}
			>
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

				{/* mobile navbar */}

				<div className={styles.mobile_header_container}>
					<Image
						style={{ cursor: 'pointer' }}
						src={logo}
						height={40}
						alt="logo"
						onClick={() => router.push(`/`)}
					/>
					<MenuOutlined
						onClick={showDrawer}
						style={{
							fontSize: '35px',
							color: 'var(--button-color)',
						}}
					/>
				</div>

				{/* Nav drawer */}

				<div className={styles.drawer_container}>
					<Drawer
						placement="left"
						closeIcon={
							<CloseCircleOutlined
								style={{ fontSize: '35px', color: 'var(--button-color)' }}
							/>
						}
						onClose={onClose}
						open={open}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{profile_img ? (
								<Image
									src={profile_img}
									alt="profile_img"
									width={80}
									height={80}
									style={{
										fontSize: '20px',
										color: 'white',
										cursor: 'pointer',
										height: '80px',
										width: '80px',
										padding: '10px',
										backgroundColor: 'var(--button-color)',
										borderRadius: '50%',
									}}
									onClick={() => router.push(`${role}/profile`)}
								/>
							) : (
								<UserOutlined
									style={{
										fontSize: '45px',
										padding: '10px',
										backgroundColor: 'var(--button-color)',
										borderRadius: '50%',
										color: 'var(--accent-color)',
										cursor: 'pointer',
									}}
									onClick={() => router.push(`${role}/profile`)}
								/>
							)}
						</div>

						{!isUser ? (
							<>
								<Link
									href="/agencies"
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>Agencies</p>
								</Link>
								<Link href="/plans" className={styles.mobile_navigation_item}>
									{' '}
									<p>Tour plans</p>
								</Link>
								<Link href="/login" className={styles.mobile_navigation_item}>
									Login
								</Link>
								<Link href="/signup" className={styles.mobile_navigation_item}>
									Sign up
								</Link>{' '}
							</>
						) : role == 'user' ? (
							<>
								<Link
									href="/agencies"
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>Agencies</p>
								</Link>
								<Link href="/plans" className={styles.mobile_navigation_item}>
									{' '}
									<p>Tour plans</p>
								</Link>
								<Link
									href={`${role}/schedules`}
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>My plans</p>
								</Link>
								<div
									onClick={handleLogout}
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>Logout</p>
								</div>
							</>
						) : (
							<>
								<Link
									href={`${role}/profile`}
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>Dashboard</p>
								</Link>
								<div
									onClick={handleLogout}
									className={styles.mobile_navigation_item}
								>
									{' '}
									<p>Logout</p>
								</div>
							</>
						)}
					</Drawer>
				</div>
			</Header>
		</>
	);
};

export default NavBar;
