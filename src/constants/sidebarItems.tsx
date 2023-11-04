import {
	CreditCardOutlined,
	TableOutlined,
	ThunderboltOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { USER_ROLE } from './role';
export const sidebarItems = (role: string) => {
	const defaultSidebarItems: MenuProps['items'] = [
		{
			label: <Link href={`/${role}/profile`}>Profile</Link>,
			icon: <UserOutlined />,
			key: `/${role}/profile`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];

	const commonAdminSidebarItems: MenuProps['items'] = [
		{
			label: <Link href={`/${role}/agencies`}>Manage Agencies</Link>,
			icon: <TableOutlined />,
			key: `/${role}/agencies`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/tour-plans`}>Manage Tour Plans</Link>,
			icon: <TableOutlined />,
			key: `/${role}/tour-plans`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/bookings`}>Manage Booking</Link>,
			icon: <TableOutlined />,
			key: `/${role}/bookings`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/users`}>Manage Users</Link>,
			icon: <TableOutlined />,
			key: `/${role}/users`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];

	const superAdminSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		...commonAdminSidebarItems,
		{
			label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
			icon: <TableOutlined />,
			key: `/${role}/admin`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/payouts`}>Payouts</Link>,
			icon: <CreditCardOutlined />,
			key: `/${role}/payouts`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];
	const adminSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		...commonAdminSidebarItems,
	];

	const userSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		{
			label: <Link href={`/${role}/schedules`}>Manage Bookings</Link>,
			icon: <TableOutlined />,
			key: `/${role}/schedules`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/booking-history`}>Booking History</Link>,
			icon: <ThunderboltOutlined />,
			key: `/${role}/booking-history`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];

	const agencySidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		{
			label: <Link href={`/${role}/upcoming-plan`}>Upcoming Plans</Link>,
			icon: <TableOutlined />,
			key: `/${role}/upcoming-plan`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/my-plans`}>All Plans</Link>,
			icon: <TableOutlined />,
			key: `/${role}/my-plans`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/create-plan`}>Create Tour Plan</Link>,
			icon: <TableOutlined />,
			key: `/${role}/create-plan`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/plan-history`}>Booking History</Link>,
			icon: <ThunderboltOutlined />,
			key: `/${role}/plan-history`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/payouts`}>Payouts</Link>,
			icon: <CreditCardOutlined />,
			key: `/${role}/payouts`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];

	if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
	else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
	else if (role === USER_ROLE.AGENCY) return agencySidebarItems;
	else if (role === USER_ROLE.USER) return userSidebarItems;
};
