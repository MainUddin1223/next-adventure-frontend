import {
    CreditCardOutlined,
    TableOutlined,
    ThunderboltOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {

    const defaultSidebarItems: MenuProps["items"] = [
          {
        label: <Link href={`/${role}/profile`}>Profile</Link>,
        icon:<UserOutlined/>,
        key: `/${role}/profile`
        },
    ];

    const commonAdminSidebarItems: MenuProps["items"] = [
        {
        label: <Link href={`/${role}/agencies`}>Manage Agencies</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/agencies`
        },
        {
        label: <Link href={`/${role}/tour-plans`}>Manage Tour Plans</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/tour-plans`
        },
        {
        label: <Link href={`/${role}/bookings`}>Manage Booking</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/bookings`
        },
        {
        label: <Link href={`/${role}/users`}>Manage Users</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/users`
        },
    ];


    const superAdminSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        ...commonAdminSidebarItems,
        {
        label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/admin`
        },
        {
        label: <Link href={`/${role}/payouts`}>Payouts</Link>,
        icon:<CreditCardOutlined/>,
        key: `/${role}/payouts`
        }
    ];
    const adminSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        ...commonAdminSidebarItems,
    ]

    const userSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        {
        label: <Link href={`/${role}/schedules`}>Manage Bookings</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/schedules`
        },
        {
        label: <Link href={`/${role}/booking-history`}>Booking History</Link>,
        icon:<ThunderboltOutlined/>,
        key: `/${role}/booking-history`
        },
    ];

    const agencySidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        {
        label: <Link href={`/${role}/upcoming-plan`}>Upcoming Plans</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/upcoming-plan`
        },
        {
        label: <Link href={`/${role}/my-plans`}>All Plans</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/my-plans`
        },
        {
        label: <Link href={`/${role}/create-plan`}>Create Tour Plan</Link>,
        icon:<TableOutlined/>,
        key: `/${role}/create-plan`
        },
        {
        label: <Link href={`/${role}/plan-history`}>Booking History</Link>,
        icon:<ThunderboltOutlined/>,
        key: `/${role}/plan-history`
        },
        {
        label: <Link href={`/${role}/payouts`}>Payouts</Link>,
        icon:<CreditCardOutlined/>,
        key: `/${role}/payouts`
        },
    ];


     if(role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems
     else if(role === USER_ROLE.ADMIN) return adminSidebarItems
     else if(role === USER_ROLE.AGENCY) return agencySidebarItems
     else if(role === USER_ROLE.USER) return userSidebarItems
}