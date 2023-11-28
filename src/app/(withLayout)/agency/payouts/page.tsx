'use client';
import { useGetPayoutsQuery } from '@/redux/api/agencyApi';
import { Card, Table, Tabs, TabsProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const Payouts = () => {
	const [status, setStatus] = useState<undefined | string>(undefined);
	const { data, isLoading } = useGetPayoutsQuery(status);
	const payouts = data?.result;

	const onChange = (key: string) => {
		if (key == 'all') {
			setStatus(undefined);
		} else {
			setStatus(key);
		}
	};

	const columns = [
		{
			title: 'Plan Name',
			render: function (data: any) {
				return (
					<>
						<h4>{data?.plan?.planName}</h4>
					</>
				);
			},
		},
		{
			title: 'Plan Price',
			render: function (data: any) {
				return (
					<>
						<h4>$ {data?.plan?.price}</h4>
					</>
				);
			},
		},
		{
			title: 'Total amount',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
		},
		{
			title: 'Booked Seats',
			render: function (data: any) {
				return (
					<>
						<h4> {data?.booking?.seats}</h4>
					</>
				);
			},
		},
		{
			title: 'Booking Date',
			dataIndex: 'createdAt',
			render: function (data: any) {
				return data && dayjs(data).format('MMM D, YYYY hh:mm A');
			},
		},
	];

	const items: TabsProps['items'] = [
		{
			key: 'all',
			label: 'All',
			children: (
				<Table
					loading={isLoading}
					dataSource={payouts}
					columns={columns}
					pagination={false}
					scroll={{ x: 'calc(350px + 50%)' }}
				/>
			),
		},
		{
			key: 'pending',
			label: 'Pending',
			children: (
				<Table
					loading={isLoading}
					dataSource={payouts}
					columns={columns}
					pagination={false}
					scroll={{ x: 'calc(350px + 50%)' }}
				/>
			),
		},
		{
			key: 'released',
			label: 'released',
			children: (
				<Table
					loading={isLoading}
					dataSource={payouts}
					columns={columns}
					pagination={false}
					scroll={{ x: 'calc(350px + 50%)' }}
				/>
			),
		},
		{
			key: 'postponed',
			label: 'Postponed',
			children: (
				<Table
					loading={isLoading}
					dataSource={payouts}
					columns={columns}
					pagination={false}
					scroll={{ x: 'calc(350px + 50%)' }}
				/>
			),
		},
	];
	return (
		<div>
			<Card>
				<h2>My payout details</h2>
				<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
			</Card>
		</div>
	);
};

export default Payouts;
