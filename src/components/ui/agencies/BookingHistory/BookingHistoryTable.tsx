'use client';

import {
	useGetMyBookingHistoryQuery,
	useManageAgencyBookingsMutation,
} from '@/redux/api/agencyApi';
import { Button, Card, Table, message } from 'antd';

const MyPlans = ({ id }: { id: number }) => {
	const [manageBookings] = useManageAgencyBookingsMutation();

	const handleBookings = async (id: number, status: string) => {
		const result = await manageBookings({ id, status });
		//@ts-ignore
		const data = result?.data;
		console.log(data);
		if (data.success) {
			if (status == 'canceled') {
				message.warning('Booking have canceled successfully');
			}
			if (status == 'rejected') {
				message.warning('Booking have rejected successfully');
			}
			if (status == 'booked') {
				message.success('Congratulations!!! You have confirmed the booking');
			}
		}
	};
	const { data, isLoading } = useGetMyBookingHistoryQuery(id);
	const PlanBookingHistoryList = data?.booking_history;

	const columns = [
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Number of seat',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Total amount',
			dataIndex: 'total_amount',
			key: 'total_amount',
		},
		{
			title: 'Action',
			render: function (data: any) {
				return (
					<>
						{data.status == 'booked' ? (
							<div style={{ display: 'flex', gap: '5px' }}>
								<Button
									danger
									onClick={() => handleBookings(data?.id, 'cenceled')}
								>
									Cancel Booking
								</Button>
							</div>
						) : data.status == 'cenceled' || data.status == 'rejected' ? (
							<div>
								<Button disabled danger style={{ textTransform: 'capitalize' }}>
									{data.status}
								</Button>
							</div>
						) : (
							<div style={{ display: 'flex', gap: '5px' }}>
								<Button
									type="primary"
									onClick={() => handleBookings(data?.id, 'booked')}
								>
									Accept Booking
								</Button>
								<Button
									danger
									onClick={() => handleBookings(data?.id, 'rejected')}
								>
									Reject
								</Button>
							</div>
						)}
					</>
				);
			},
		},
	];

	return (
		<>
			<Card>
				<span
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						margin: '10px 0',
					}}
				>
					Plan Title: <h3> {data?.plan_name}</h3>
				</span>
				<Table
					columns={columns}
					dataSource={PlanBookingHistoryList}
					loading={isLoading}
					pagination={false}
				/>
			</Card>
		</>
	);
};

export default MyPlans;
