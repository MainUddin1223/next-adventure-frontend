'use client';

import MobileTable from '@/components/ui/Tables/TableForMobile/MobileTable';
import PaginationCompo from '@/components/ui/pagination/Pagination';
import {
	useBookingHistoryQuery,
	useReviewPlanMutation,
} from '@/redux/api/userApi';
import { useDebounced } from '@/redux/hooks';
import { formateDateAndTime } from '@/services/timeFormater';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, Rate, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import styles from './page.module.css';

const BookingHistory = () => {
	const query: Record<string, any> = {};
	const [size, setSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [modal, setModal] = useState(false);
	const [rating, setRating] = useState(5);
	const [feedback, setFeedback] = useState('');
	const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

	query['limit'] = size;
	query['page'] = page;

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 600,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	const [reviewPlan] = useReviewPlanMutation();

	const handleReview = async (
		id: number,
		plan_id: number,
		agency_id: number
	) => {
		const data = { rating, feedback };
		const res = await reviewPlan({ data, id });
		//@ts-ignore
		if (res?.data?.success == false) {
			message.error('Failed to submit review');
		} else {
			message.success('Review submitted successfully');
		}
		setModal(false);
	};

	const { data, isLoading } = useBookingHistoryQuery({ ...query });

	const bookings = data?.result;
	const meta = data?.meta;

	const resetFilters = () => {
		setSortBy('');
		setSortOrder('');
		setSearchTerm('');
	};

	const items = bookings?.map((booking: any) => {
		const { date: bookingDate } = formateDateAndTime(booking?.createdAt);
		return {
			key: booking?.id,
			label: (
				<div>
					<p style={{ fontSize: '18px', fontWeight: 'bold' }}>
						{booking?.plan?.planName}
					</p>
					<div style={{ fontSize: '18px' }}>
						{booking.status == 'pending' ? (
							<strong style={{ color: 'yellowgreen' }}>Pending</strong>
						) : booking.status == 'confirmed' ? (
							<strong style={{ color: 'var(--button-color)' }}>Booked</strong>
						) : (
							booking.status == 'canceled' && (
								<strong style={{ color: 'red' }}> Canceled</strong>
							)
						)}
					</div>
				</div>
			),
			children: (
				<div>
					<h3>Planner : {booking?.agency?.name}</h3>
					<p style={{ fontWeight: 'bold' }}>Booking date : {bookingDate}</p>
					<p style={{ fontWeight: 'bold' }}>
						Destination: {booking?.plan?.destination}
					</p>
					<p style={{ fontWeight: 'bold' }}>
						Total Amount : $ {booking?.totalAmount}
					</p>
					<Button
						type="primary"
						style={{ margin: '15px 0' }}
						onClick={() => setModal(true)}
					>
						Leave feedback
					</Button>{' '}
					<br />
					<Modal
						title="Leave your experience"
						centered
						open={modal}
						onOk={() =>
							handleReview(booking?.id, booking?.plan.id, booking?.agency?.id)
						}
						okButtonProps={{ disabled: feedback ? false : true }}
						onCancel={() => setModal(false)}
						width={500}
					>
						<Rate
							style={{ margin: '15px 0', color: 'var(--button-color)' }}
							tooltips={desc}
							onChange={(e) => {
								setRating(e.valueOf());
							}}
							value={rating}
						/>
						<p>Feedback</p>
						<TextArea
							onChange={(e) => setFeedback(e.target.value)}
							autoSize={{ minRows: 3, maxRows: 5 }}
						/>
					</Modal>
				</div>
			),
		};
	});
	return (
		<>
			<Card>
				<h2 style={{ marginBottom: '10px' }}>Booking history</h2>
				<div
					style={{
						display: 'flex',
						gap: '10px',
						margin: '10px 0',
						alignItems: 'center',
					}}
				>
					<div className={styles.searchField}>
						<Input
							type="text"
							size="large"
							placeholder="Search ... "
							style={{ width: '100%' }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div>
						{(!!sortBy || !!sortOrder || !!searchTerm) && (
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
				<MobileTable items={items} />
				<PaginationCompo
					totalPage={meta?.total}
					setPage={setPage}
					setSize={setSize}
				/>
			</Card>
		</>
	);
};

export default BookingHistory;
