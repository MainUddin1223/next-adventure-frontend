'use client';
import { sidebarItems } from '@/constants/sidebarItems';
import { getUserInfo } from '@/services/auth.service';
import { Layout, Menu } from 'antd';
import { useState } from 'react';

const { Sider } = Layout;

const SideBar = () => {
	const [collapsed, setCollapsed] = useState(false);

	const { role } = getUserInfo() as any;

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			width={280}
			style={{
				overflow: 'hidden',
				height: '100vh',
				position: 'sticky',
				left: 0,
				top: 0,
				bottom: 0,
				backgroundColor: 'var(--accent-color)',
			}}
		>
			<div
				style={{
					fontSize: '1.5rem',
					textAlign: 'center',
					fontWeight: 'bold',
					margin: '1rem 0',
					color: 'var(--primary-color)',
				}}
			>
				{collapsed ? 'NA' : 'NEXT ADVENTURE'}
			</div>
			<Menu
				style={{
					backgroundColor: 'var(--accent-color)',
					fontWeight: 'bold',
					fontSize: '19px',
					color: 'var(--primary-color)',
				}}
				defaultSelectedKeys={['1']}
				mode="inline"
				items={sidebarItems(role)}
			/>
		</Sider>
	);
};

export default SideBar;
