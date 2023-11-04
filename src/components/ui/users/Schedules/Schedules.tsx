'use client';

import {
	useGetUpcomingSchedulesQuery,
	useManageBookingsMutation,
} from '@/redux/api/userApi';
import { formateDateAndTime } from '@/services/timeFormater';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Table, Tag, message } from 'antd';
import MobileTable from '../../Tables/TableForMobile/MobileTable';
import styles from './Schedules.module.css';

const ManageSchedules = () => {
	const [manageBookings] = useManageBookingsMutation();

	const bookingHandler = (
		status: string,
		isValidDeadline: boolean,
		id: number
	) => {
		return status == 'booked' || status == 'pending' ? (
			<div style={{ display: 'flex', gap: '5px' }}>
				<Button
					danger
					disabled={isValidDeadline ? false : true}
					onClick={() => handleBookings(id)}
				>
					Cancel Booking
				</Button>
			</div>
		) : status == 'cenceled' || status == 'rejected' ? (
			<div>
				<Button disabled danger style={{ textTransform: 'capitalize' }}>
					{status}
				</Button>
			</div>
		) : (
			<div style={{ display: 'flex', gap: '5px' }}>
				<Button type="primary" onClick={() => handleBookings(id)}>
					Cancel Booking
				</Button>
			</div>
		);
	};

	const statusHandler = (status: string) => {
		return (
			<div>
				{status == 'pending' ? (
					<strong style={{ color: 'yellowgreen', textTransform: 'capitalize' }}>
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
					status == 'cenceled' && (
						<strong style={{ color: 'red', textTransform: 'capitalize' }}>
							{' '}
							{status}
						</strong>
					)
				)}
			</div>
		);
	};

	const handleBookings = async (id: number) => {
		const result = await manageBookings(id);
		//@ts-ignore
		const data = result?.data;
		if (data.success) {
			if (data.status == 'cenceled') {
				message.warning('Booking have cenceld successfully');
			}
			if (data.status == 'rejected') {
				message.warning('Booking have rejected successfully');
			}
			if (data.status == 'booked') {
				message.success('Congratulations!!! You have confirmed the booking');
			}
		}
	};

	const { data: bookingData, isLoading } =
		useGetUpcomingSchedulesQuery(undefined);
	const upcomingSchedulesList = bookingData?.result;

	const columns = [
		{
			title: 'Plan name',
			render: (data: any) => <h3>{data?.plan?.plan_name}</h3>,
		},
		{
			title: 'Booking Status',
			render: (data: any) => {
				const bookingStatus = statusHandler(data?.status);
				return bookingStatus;
			},
		},
		{
			title: 'Reporting time',
			render: (data: any) => {
				const { time, date } = formateDateAndTime(data?.plan?.starting_time);
				return (
					<p>
						{time} {date}
					</p>
				);
			},
		},
		{
			title: 'Deadline',
			render: (data: any) => {
				const currentDate = new Date();
				currentDate.setHours(currentDate.getHours() + 6);
				const formattedDate = currentDate.toISOString();
				const isValidDeadline = data.plan?.booking_deadline > formattedDate;
				const { time, date } = formateDateAndTime(data?.plan?.booking_deadline);
				return isValidDeadline ? (
					<p>
						{time} {date}
					</p>
				) : (
					<p style={{ color: 'red' }}>
						{time} {date}
					</p>
				);
			},
		},
		{
			title: 'Total Seat',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Action',
			render: function (data: any) {
				const currentDate = new Date();
				currentDate.setHours(currentDate.getHours() + 6);
				const formattedDate = currentDate.toISOString();
				const isValidDeadline = data.plan?.booking_deadline > formattedDate;
				const handleBooking = bookingHandler(
					data.status,
					data?.plan?.booking_deadline,
					data.id
				);
				return <>{handleBooking}</>;
			},
		},
	];

	const items = upcomingSchedulesList?.map((schedule: any) => {
		const currentDate = new Date();
		currentDate.setHours(currentDate.getHours() + 6);
		const formattedDate = currentDate.toISOString();
		const isValidDeadline = schedule.plan?.booking_deadline > formattedDate;
		const { time, date } = formateDateAndTime(schedule?.plan?.starting_time);
		const handleBooking = bookingHandler(
			schedule.status,
			schedule?.plan?.booking_deadline,
			schedule.id
		);
		const booingStatus = statusHandler(schedule?.status);
		return {
			key: schedule?.id,
			label: (
				<div>
					<p style={{ fontSize: '18px', fontWeight: 'bold' }}>
						{schedule?.plan?.plan_name}
					</p>
					<div style={{ fontSize: '18px' }}>
						{' '}
						<p style={{ display: 'flex', gap: '5px' }}>Status:{booingStatus}</p>
					</div>
				</div>
			),
			children: (
				<div>
					<h3>Booked for: {schedule?.quantity} Person</h3>
					<h3>Total Amount : $ {schedule?.total_amount}</h3>
					<h3>
						Departure : {time} {date}
					</h3>
					{isValidDeadline ? (
						<Tag color="green">Booking available</Tag>
					) : (
						<Tag icon={<ExclamationCircleOutlined />} color="error">
							Booking closed
						</Tag>
					)}
					<>{handleBooking}</>
				</div>
			),
		};
	});

	return (
		<>
			<Card>
				<h2
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						margin: '10px 0',
					}}
				>
					Upcoming Schedules
				</h2>
				<div className={styles.schedules_table_container}>
					<Table
						columns={columns}
						dataSource={upcomingSchedulesList}
						loading={isLoading}
						pagination={false}
					/>
				</div>
				<div className={styles.schedules_table_mobile_container}>
					<MobileTable items={items} />
				</div>
			</Card>
		</>
	);
};

export default ManageSchedules;
