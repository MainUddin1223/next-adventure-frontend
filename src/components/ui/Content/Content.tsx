'use client';
import logo from '@/assets/travel-logo.png';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { getUserInfo } from '@/services/auth.service';
import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import SmallDeviceSideBar from '../ProfileSideBar/SmallDeviceSideBar';
import styles from './Content.module.css';

const { Content } = Layout;

const getCrumbs = (currentPath: string) => {
	let items: any = [];
	const paths = currentPath.split('/');
	let prevPath: string;

	paths.map((path) => {
		if (!path) {
			prevPath = '';
		} else {
			prevPath = `${prevPath}/${path}`;
			items.push({
				label: path,
				link: `${prevPath}`,
			});
		}
	});
	return items;
};

const Contents = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const { role } = getUserInfo() as any;
	const currentPath = usePathname();
	const [userLogout] = useUserLogoutMutation();
	const res = getCrumbs(currentPath);
	const router = useRouter();

	const handleLogout = async () => {
		await userLogout(undefined);
		localStorage.clear();
		router.push('/');
	};

	return (
		<Content style={{ minHeight: '100vh', color: 'black' }}>
			<Header
				className={styles.header_container}
				style={{ backgroundColor: 'var(--accent-color)' }}
			>
				<div className={styles.nav_container_mobile}>
					<Image
						style={{ cursor: 'pointer' }}
						src={logo}
						height={40}
						alt="logo"
						onClick={() => router.push(`/`)}
					/>
					<MenuOutlined
						onClick={() => setOpen(true)}
						style={{
							fontSize: '35px',
							color: 'var(--button-color)',
						}}
					/>
				</div>
			</Header>
			<div>
				<SmallDeviceSideBar open={open} setOpen={setOpen} />
			</div>
			<div style={{ padding: '15px' }}>
				<BreadCrumb items={res} />
				{children}
			</div>
		</Content>
	);
};

export default Contents;
