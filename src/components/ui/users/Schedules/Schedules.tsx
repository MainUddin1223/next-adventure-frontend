'use client';

import {
	useGetUpcomingSchedulesQuery,
	useManageBookingsMutation,
} from '@/redux/api/userApi';
import { formateDateAndTime } from '@/services/timeFormater';
import { Button, Card, Table, message } from 'antd';
import MobileTable from '../../Tables/TableForMobile/MobileTable';
import styles from './Schedules.module.css';

const ManageSchedules = () => {
	const [manageBookings] = useManageBookingsMutation();

	const bookingHandler = (
		status: string,
		isValidDeadline: boolean,
		id: number
	) => {
		return status == 'confirmed' || status == 'pending' ? (
			<div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
				<Button
					danger
					disabled={isValidDeadline ? false : true}
					onClick={() => handleBookings('canceled', id)}
				>
					Cancel Booking
				</Button>
			</div>
		) : status == 'canceled' || status == 'rejected' ? (
			<div>
				<Button
					disabled
					danger
					style={{ textTransform: 'capitalize', marginTop: '10px' }}
				>
					{status}
				</Button>
			</div>
		) : (
			<div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
				<Button type="primary" onClick={() => handleBookings('canceled', id)}>
					Cancel Booking
				</Button>
			</div>
		);
	};

	const statusHandler = (status: string) => {
		return (
			<div>
				{status == 'pending' ? (
					<strong style={{ color: 'blue', textTransform: 'capitalize' }}>
						{' '}
						{status}
					</strong>
				) : status == 'confirmed' ? (
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
						<strong style={{ color: 'red', textTransform: 'capitalize' }}>
							{' '}
							{status}
						</strong>
					)
				)}
			</div>
		);
	};

	const handleBookings = async (status: string, id: number) => {
		const result = await manageBookings({ id, status });
		//@ts-ignore
		const data = result?.data;
		if (data.success) {
			if (data.status == 'canceled') {
				message.warning('Booking have canceled successfully');
			}
			if (data.status == 'rejected') {
				message.warning('Booking have rejected successfully');
			}
			if (data.status == 'confirmed') {
				message.success('Congratulations!!! You have confirmed the booking');
			}
		}
	};

	const { data: bookingData, isLoading } =
		useGetUpcomingSchedulesQuery(undefined);
	const upcomingSchedulesList = bookingData?.result;

	//For desktop view

	const columns = [
		{
			title: 'Plan name',
			render: (data: any) => <h3>{data?.plan?.planName}</h3>,
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
				const { time, date } = formateDateAndTime(data?.plan?.departureTime);
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
				const isValidDeadline = data.plan?.deadline > formattedDate;
				const { time, date } = formateDateAndTime(data?.plan?.deadline);
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
			dataIndex: 'seats',
			key: 'seats',
		},
		{
			title: 'Action',
			render: function (data: any) {
				const currentDate = new Date();
				currentDate.setHours(currentDate.getHours() + 6);
				const formattedDate = currentDate.toISOString();
				const isValidDeadline = data.plan?.deadline > formattedDate;
				const handleBooking = bookingHandler(
					data.status,
					isValidDeadline,
					data.id
				);
				return <>{handleBooking}</>;
			},
		},
	];

	//for mobile view
	const items = upcomingSchedulesList?.map((schedule: any) => {
		console.log(schedule);
		const currentDate = new Date();
		currentDate.setHours(currentDate.getHours() + 6);
		const formattedDate = currentDate.toISOString();
		const isValidDeadline = schedule.plan?.deadline > formattedDate;
		const { time, date } = formateDateAndTime(schedule?.plan?.starting_time);
		const handleBooking = bookingHandler(
			schedule.status,
			schedule?.plan?.deadline,
			schedule.id
		);
		const booingStatus = statusHandler(schedule?.status);

		return {
			key: schedule?.id,
			label: (
				<div>
					<p style={{ fontSize: '18px', fontWeight: 'bold' }}>
						{schedule?.plan?.planName}
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
					<h3>Total Amount : $ {schedule?.totalAmount}</h3>
					<h3>Total booking : {schedule.seats} seats</h3>
					<h3>
						Departure : {time} {date}
					</h3>
					{/* {isValidDeadline ? (
						<Tag color="green">Booking available</Tag>
					) : (
						<Tag icon={<ExclamationCircleOutlined />} color="error">
							Booking closed
						</Tag>
					)} */}
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
						margin: '5px 0',
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
