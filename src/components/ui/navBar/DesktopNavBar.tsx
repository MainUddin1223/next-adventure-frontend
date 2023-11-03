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
						<Link href="/agencies" className={styles.navigation_item}>
							{' '}
							<p>Agencies</p>
						</Link>
						<Link href="/plans" className={styles.navigation_item}>
							{' '}
							<p>Tour plans</p>
						</Link>
						<Link
							href={`/${role}/schedules`}
							className={styles.navigation_item}
						>
							{' '}
							<p>My plans</p>
						</Link>
						<div
							onClick={logout}
							className={styles.navigation_item}
							style={{ cursor: 'pointer' }}
						>
							{' '}
							<p style={{ cursor: 'pointer' }}>Logout</p>
						</div>
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
						<Link
							href={`${role}/profile`}
							className={styles.mobile_navigation_item}
						>
							{' '}
							<p>Dashboard</p>
						</Link>
						<div onClick={logout} className={styles.mobile_navigation_item}>
							{' '}
							<p>Logout</p>
						</div>
					</div>
				)
			) : (
				<div className={styles.navigation_item_container}>
					<Link href="/agencies" className={styles.navigation_item}>
						{' '}
						<p>Agencies</p>
					</Link>
					<Link href="/plans" className={styles.navigation_item}>
						{' '}
						<p>Tour plans</p>
					</Link>
					<Link href="/login" className={styles.navigation_item}>
						Login
					</Link>
					<Link href="/signup" className={styles.navigation_item}>
						Sign up
					</Link>{' '}
				</div>
			)}
		</div>
	);
};

export default DesktopNavBar;
