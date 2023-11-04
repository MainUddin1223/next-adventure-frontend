import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { INavProps } from '../types';
import styles from './NavBar.module.css';

const DesktopNavBar = ({ role, isUser, logout, profile_img }: INavProps) => {
	const router = useRouter();
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
						<p>
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
					</div>
				)
			) : (
				<div className={styles.navigation_item_container}>
					<p>
						<Link
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
					<p>
						<Link
							href="/signup"
							style={{
								border: '1px solid var(--primary-color) ',
								fontWeight: 'bold',
								color: 'var(--primary-color)',
								padding: '5px',
							}}
						>
							Sign up
						</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default DesktopNavBar;
