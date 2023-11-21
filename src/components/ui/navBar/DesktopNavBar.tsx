import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutBtn from '../LogoutBtn';
import { INavProps } from '../types';
import styles from './NavBar.module.css';

const DesktopNavBar = ({ role, isUser, logout, profile_img }: INavProps) => {
	const router = useRouter();
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link
					href={`${role}/profile`}
					style={{
						border: '1px solid var(--primary-color) ',
						fontWeight: 'bold',
						color: 'var(--primary-color)',
						padding: '5px',
					}}
				>
					Dashboard
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<div
					style={{
						border: '1px solid var(--primary-color) ',
						fontWeight: 'bold',
						color: 'var(--primary-color)',
						padding: '2px 5px',
					}}
					onClick={() => {
						localStorage.clear();
						router.push('/');
					}}
				>
					<LogoutBtn title={true} />
				</div>
			),
		},
	];

	return (
		<div className={styles.header_container}>
			{isUser ? (
				role == 'user' ? (
					<div className={styles.navigation_item_container}>
						<p>
							<Link
								href="/plans"
								style={{
									border: '1px solid var(--primary-color) ',
									fontWeight: 'bold',
									color: 'var(--primary-color)',
									padding: '5px',
								}}
							>
								Book a plan
							</Link>
						</p>
						<p>
							<Link
								href="/plans"
								style={{
									border: '1px solid var(--primary-color) ',
									fontWeight: 'bold',
									color: 'var(--primary-color)',
									padding: '5px',
								}}
							>
								Ongoing Plans
							</Link>
						</p>
						<p>
							<Link
								href={`/${role}/schedules`}
								style={{
									border: '1px solid var(--primary-color) ',
									fontWeight: 'bold',
									color: 'var(--primary-color)',
									padding: '5px',
								}}
							>
								Schedules
							</Link>
						</p>
						<p>
							<button
								onClick={logout}
								style={{
									cursor: 'pointer',
									backgroundColor: 'var(--accent-color)',
									fontSize: '19px',
									border: '1px solid var(--primary-color) ',
									fontWeight: 'bold',
									color: 'var(--primary-color)',
									padding: '5px',
								}}
							>
								Logout
							</button>
						</p>
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
				) : (
					<div className={styles.navigation_item_container}>
						<Dropdown menu={{ items }}>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
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
												height: '45px',
												width: '45px',
												borderRadius: '50%',
											}}
											onClick={() => router.push(`${role}/profile`)}
										/>
									) : (
										<UserOutlined
											style={{
												fontSize: '25px',
												padding: '5px',
												color: 'white',
												cursor: 'pointer',
												borderRadius: '50%',
												backgroundColor: 'var(--primary-color)',
											}}
											onClick={() => router.push(`${role}/profile`)}
										/>
									)}
									<CaretDownOutlined
										style={{ fontSize: '16px', color: 'var(--primary-color)' }}
									/>
								</Space>
							</a>
						</Dropdown>
					</div>
				)
			) : (
				<div className={styles.navigation_item_container}>
					<p>
						<Link
							className={styles.nav_item}
							href="/agencies"
							style={{
								border: '1px solid var(--primary-color) ',
								fontWeight: 'bold',
								color: 'var(--primary-color)',
								padding: '5px',
							}}
						>
							Tour Planners
						</Link>
					</p>
					<p>
						<Link
							className={styles.nav_item}
							href="/plans"
							style={{
								border: '1px solid var(--primary-color) ',
								fontWeight: 'bold',
								color: 'var(--primary-color)',
								padding: '5px',
							}}
						>
							Ongoing Plans
						</Link>
					</p>
					<p>
						<Link
							href="/login"
							className={styles.nav_item}
							style={{
								border: '1px solid var(--primary-color) ',
								fontWeight: 'bold',
								color: 'var(--primary-color)',
								padding: '5px',
							}}
						>
							Login
						</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default DesktopNavBar;
