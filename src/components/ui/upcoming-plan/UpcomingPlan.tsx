'use client';

import { useGetMyTourPlansQuery } from '@/redux/api/agencyApi';
import { useDebounced } from '@/redux/hooks';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DesktopTable from '../Tables/TableForDesktop/DesktopTable';

interface DataType {
	key: React.Key;
	name: string;
	platform: string;
	version: string;
	upgradeNum: number;
	creator: string;
	createdAt: string;
	bookings?: any[];
}

interface ExpandedDataType {
	key: React.Key;
	date: string;
	name: string;
	upgradeNum: string;
}

const UpcomingPlan = () => {
	const query: Record<string, any> = {};
	const router = useRouter();
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');

	query['limit'] = size;
	query['page'] = page;

	const onPaginationChange = (page: number, pageSize: number) => {
		setSize(pageSize);
		setPage(page);
	};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 600,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}

	const { data, isLoading } = useGetMyTourPlansQuery(undefined);

	const myPlans = data?.result;
	const meta = data?.meta;
	const onTableChange = (pagination: any, filter: any, sorter: any) => {
		const { field, order } = sorter;
		setSortBy(field as string);
		setSortOrder(order === 'asc' ? 'asc' : 'desc');
	};

	const resetFilters = () => {
		setSortBy('');
		setSortOrder('');
		setSearchTerm('');
	};
	console.log(myPlans);

	const defaultExpandable = {
		expandedRowRender: (record: DataType) => {
			console.log(record);
			const columns: TableColumnsType<ExpandedDataType> = [
				{
					title: 'Status',
					dataIndex: 'status',
					render: (status) => {
						return (
							<div>
								{status == 'pending' ? (
									<strong
										style={{
											color: 'yellowgreen',
											textTransform: 'capitalize',
										}}
									>
										{' '}
										{status}
									</strong>
								) : status == 'booked' ? (
									<strong
										style={{
											color: 'var(--button-color)',
											textTransform: 'capitalize',
										}}
									>
										{' '}
										{status}
									</strong>
								) : (
									status == 'canceled' && (
										<strong
											style={{ color: 'red', textTransform: 'capitalize' }}
										>
											{' '}
											{status}
										</strong>
									)
								)}
							</div>
						);
					},
				},
				{
					title: 'Booking Date',
					dataIndex: 'createdAt',
					render: function (data: any) {
						return data && dayjs(data).format('DD/MM/YYYY');
					},
				},
				{
					title: 'Total Seats',
					dataIndex: 'seats',
					render: function (data: any) {
						return (
							<strong>
								{data} {data > 1 ? 'Seats' : 'Seat'}
							</strong>
						);
					},
				},
				{
					title: 'Amount',
					dataIndex: 'totalAmount',
					render: (data) => <strong>${data}</strong>,
				},
				{
					title: 'Handle Bookings',
					dataIndex: 'status',
					key: 'status',
					render: () => (
						<Space size="middle">
							<Button type="primary">Accept</Button>
							<Button danger>Reject</Button>
						</Space>
					),
				},
			];

			return (
				<Table
					columns={columns}
					dataSource={record.bookings}
					pagination={false}
				/>
			);
		},
	};

	const columns = [
		{
			title: 'Plan name',
			dataIndex: 'planName',
			key: 'planName',
		},
		{
			title: 'Destination',
			dataIndex: 'destination',
			key: 'destination',
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			render: function (data: any) {
				return data && dayjs(data).format('MMM D, YYYY hh:mm A');
			},
		},
		{
			title: 'Total Booking',
			dataIndex: 'totalBooking',
			key: 'totalBooking',
		},
		{
			title: 'Total Seats',
			dataIndex: 'totalSeats',
			key: 'totalSeats',
		},
		// {
		//   title: 'Bookings',render: function (data:any) {
		//     return (
		//       <>
		//            <div style={{ display: "flex", gap: "5px" }}>
		//        <Button type="primary" onClick={()=>router.push(`plan-history/${data.id}`)}>See Booking</Button>
		//         </div>

		//       </>
		//     )
		//  }
		// },
		{
			title: 'Action',
			render: function (data: any) {
				return (
					<>
						<div style={{ display: 'flex', gap: '5px' }}>
							<Button type="primary">
								<EditOutlined />
							</Button>
						</div>
					</>
				);
			},
		},
	];
	return (
		<>
			<Card>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						margin: '10px 0',
					}}
				>
					<Input
						type="text"
						size="large"
						placeholder="Search ... "
						style={{ width: '20%' }}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<div>
						{(!sortBy || !!sortOrder || !!searchTerm) && (
							<Button
								onClick={resetFilters}
								type="primary"
								style={{ margin: '0px 5px' }}
							>
								<ReloadOutlined />
							</Button>
						)}
					</div>
				</div>
				<DesktopTable
					columns={columns}
					dataSource={myPlans}
					expandable={defaultExpandable}
					loading={isLoading}
					pageSize={size}
					totalPages={meta?.total}
					showSizeChanger={true}
					onPaginationChange={onPaginationChange}
					onTableChange={onTableChange}
					showPagination={true}
				/>
			</Card>
		</>
	);
};

export default UpcomingPlan;
