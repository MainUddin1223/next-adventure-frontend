'use client';
import logo from '@/assets/travel-logo.png';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import {
	CloseCircleOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './NavBar.module.css';
const { Header, Content, Footer } = Layout;

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const [userLogout] = useUserLogoutMutation();
	const { role } = getUserInfo() as any;
	const router = useRouter();
	const profile_img =
		typeof window !== 'undefined' && localStorage.getItem('profile_img');

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
					backgroundColor: 'var(--header-color)',
					padding: '0 10px',
				}}
			>
				<span className={styles.header_container}>

							<Image style={{cursor:"pointer"}} src={logo} height={40} alt="logo" onClick={() => router.push(`/`)}/>
					{!isUser || role == 'user' ? (
						<div>
							<div className={styles.navigation_item_container}>
								<Link href="/agencies" className={styles.navigation_item}>
									{' '}
									<p>Agencies</p>
								</Link>
								<Link href="/plans" className={styles.navigation_item}>
									{' '}
									<p>Tour plans</p>
								</Link>
								{isUser ? (
									<>
										<Link
											href={`/${role}/schedules`}
											className={styles.navigation_item}
										>
											{' '}
											<p>My plans</p>
										</Link>
										<div
											style={{
												width: '60px',
												margin: '0 auto',
												display: 'block',
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
														padding: '5px',
														color: 'white',
														cursor: 'pointer',
														height: '60px',
														width: '60px',
														borderRadius: '50%',
													}}
													onClick={() => router.push(`${role}/profile`)}
												/>
											) : (
												<UserOutlined
													style={{
														fontSize: '20px',
														padding: '5px',
														color: 'white',
														cursor: 'pointer',
													}}
													onClick={() => router.push(`${role}/profile`)}
												/>
											)}
										</div>
									</>
								) : (
									<>
										<Link href="/login" className={styles.navigation_item}>
											Login
										</Link>
									</>
								)}
							</div>
						</div>
					) : (
						<div className={styles.navigation_item_container}>
							<a href={`${role}/profile`} className={styles.navigation_item}>
								Dashboard
								</a>
							{profile_img ? (
								<Image
									src={profile_img}
									alt="profile_img"
									width={30}
									height={30}
									style={{
										fontSize: '20px',
										padding: '5px',
										color: 'white',
										cursor: 'pointer',
										height: '45px',
										width: '45px',
										borderRadius: '50%',
									}}
									onClick={() => router.push(`${role}/profile`)}
								/>
							) : (
								<UserOutlined
									style={{
										fontSize: '20px',
										padding: '5px',
										color: 'white',
										cursor: 'pointer',
									}}
									onClick={() => router.push(`${role}/profile`)}
								/>
							)}
						</div>
					)}

					{/* mobile navbar */}
					<div className={styles.drawer_container}>
						<UnorderedListOutlined
							onClick={showDrawer}
							style={{
								fontSize: '35px',
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
							}}
						/>
						<Drawer
							placement="left"
							closeIcon={
								<CloseCircleOutlined
									style={{ fontSize: '25px', color: 'white' }}
								/>
							}
							onClose={onClose}
							open={open}
						>
							{!isUser || role == 'user' ? (
								<>
									<div
										style={{
											width: '80px',
											margin: '0 auto',
											display: 'block',
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
													padding: '5px',
													color: 'white',
													cursor: 'pointer',
													height: '80px',
													width: '80px',
													borderRadius: '50%',
												}}
												onClick={() => router.push(`${role}/profile`)}
											/>
										) : (
											<UserOutlined
												style={{
													fontSize: '20px',
													padding: '5px',
													color: 'white',
													cursor: 'pointer',
												}}
												onClick={() => router.push(`${role}/profile`)}
											/>
										)}
									</div>
									<Link href="/agencies" className={styles.navigation_item}>
										{' '}
										<p>Agencies</p>
									</Link>
									<Link href="/plans" className={styles.navigation_item}>
										{' '}
										<p>Tour plans</p>
									</Link>
									<Link
										href={`${role}/schedules`}
										className={styles.navigation_item}
									>
										{' '}
										<p>My plans</p>
									</Link>
									{isUser ? (
										<span>
											<Button
												onClick={handleLogout}
												style={{
													width: '100%',
													fontSize: '20px',
													padding: '2px',
												}}
												type="primary"
												size="large"
											>
												Logout
											</Button>
										</span>
									) : (
										<>
											<Link href="/login" className={styles.navigation_item}>
												Login
											</Link>
											<Link href="/signup" className={styles.navigation_item}>
												Sign up
											</Link>
										</>
									)}
								</>
							) : (
								<>
									<Link
										href={`${role}/profile`}
										className={styles.navigation_item}
									>
										{' '}
										<p>Dashboard</p>
									</Link>
									<UserOutlined
										style={{
											fontSize: '20px',
											padding: '5px',
											color: 'white',
											cursor: 'pointer',
										}}
										onClick={() => router.push(`${role}/profile`)}
									/>
								</>
							)}
						</Drawer>
					</div>
				</span>
			</Header>
		</>
	);
};

export default NavBar;
