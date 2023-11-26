'use client';

import { useAppDispatch } from '@/redux/hooks';
import { checkValidity, formateDateAndTime } from '@/services/timeFormater';
import {
	CarOutlined,
	CheckCircleOutlined,
	DollarOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	FlagOutlined,
	FundProjectionScreenOutlined,
	PlayCircleOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import { Button, Card, Carousel, Col, FloatButton, Row, Tag } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from '../../buttons/BackButton';
import EditPlan from '../EditPlan/EditPlan';
import styles from './PlanDetails.module.css';

const PlanDetails = ({ data }: any) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const info: any = data;
	const bookingDeadline = formateDateAndTime(info?.deadline);
	const reportingTime = formateDateAndTime(info?.departureTime);
	const isValidDate = checkValidity(info?.deadline);
	const title = (
		<div className={styles.details_header_section}>
			<h2
				style={{
					textTransform: 'capitalize',
					padding: '10px 0',
					marginRight: '35px',
				}}
			>
				{info?.planName}
			</h2>
			<span>
				<Row gutter={15}>
					<Col lg={12} sm={24}>
						<div style={{ fontSize: '18px' }}>
							<p
								style={{
									marginTop: '10px',
									marginBottom: '5px',
									fontWeight: 'bold',
								}}
							>
								<DollarOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Booking Fee : {info?.price}{' '}
							</p>
							<p
								style={{
									margin: '10px 0',
									marginBottom: '5px',
									fontWeight: 'bold',
								}}
							>
								<FlagOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Destination : {info?.destination}
							</p>
							<p style={{ margin: '10px 0px', fontWeight: 'bold' }}>
								<CarOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Departure : {info?.departureFrom}
							</p>
							<p style={{ margin: '10px 0px', fontWeight: 'bold' }}>
								<FundProjectionScreenOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Featuring :{' '}
								{info?.featured ? (
									<span style={{ color: 'var(--primary-color)' }}>Active</span>
								) : (
									<span style={{ color: 'red' }}>Inactive</span>
								)}
							</p>
						</div>
					</Col>
					<Col lg={12} sm={24}>
						<div style={{ fontSize: '18px' }}>
							<p
								style={{
									marginTop: '10px',
									marginBottom: '5px',
									fontWeight: 'bold',
								}}
							>
								<CheckCircleOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Total Seats : {info?.totalSeats}{' '}
							</p>
							<p
								style={{
									margin: '10px 0',
									marginBottom: '5px',
									fontWeight: 'bold',
								}}
							>
								<TeamOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Total Booking : {info?.totalBooking}
							</p>
							<p style={{ margin: '10px 0px', fontWeight: 'bold' }}>
								<PlayCircleOutlined
									style={{ color: 'var(--button-color)', fontSize: '25px' }}
								/>{' '}
								Status :{' '}
								<span style={{ textTransform: 'capitalize' }}>
									{info?.status}
								</span>
							</p>
						</div>
					</Col>
				</Row>
			</span>
			<div>
				{isValidDate ? (
					<Tag color="green" style={{ fontSize: '16px', padding: '5px' }}>
						Booking Available
					</Tag>
				) : (
					<Tag
						icon={<ExclamationCircleOutlined />}
						color="error"
						style={{ fontSize: '16px', padding: '5px' }}
					>
						Booking closed{' '}
					</Tag>
				)}
				<Button
					onClick={() => setOpen(true)}
					style={{ color: 'var(--primary-color)' }}
				>
					<EditOutlined /> Edit plan
				</Button>
			</div>
		</div>
	);

	const contentStyle: React.CSSProperties = {
		margin: 0,
		maxHeight: '360px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',
	};

	return (
		<div className={styles.details_card_container}>
			<div>
				<BackButton />
			</div>
			{info && (
				<div>
					<EditPlan
						setOpen={setOpen}
						open={open}
						id={info.id}
						data={{
							totalSeats: info?.totalSeats,
							notAllowed: info?.notAllowed,
							description: info?.description,
						}}
					/>
				</div>
			)}
			<Card title={title}>
				<Row gutter={15}>
					<Col lg={12} sm={24}>
						<div>
							{info?.images.length ? (
								<Carousel>
									{info?.images.map((img: string, i: number) => (
										<div key={i}>
											<h3 style={contentStyle}>
												<Image
													src={img}
													width={100}
													height={100}
													layout="responsive"
													alt="img"
												/>
											</h3>
										</div>
									))}
								</Carousel>
							) : (
								<Carousel>
									<div>
										<Image
											src={
												'http://res.cloudinary.com/dld6ete1x/image/upload/v1697711303/n5xg1i3whu3lmg3wzrch.jpg'
											}
											width={100}
											height={100}
											layout="responsive"
											alt="default_img"
										/>
									</div>
								</Carousel>
							)}
						</div>
						<div style={{ marginTop: '20px' }}>
							<Row gutter={[20, 10]}>
								<Col md={24} lg={12}>
									<p
										style={{
											fontSize: '16px',
											fontWeight: 'bold',
											margin: '5px 0',
										}}
									>
										<span>We will start our journey at </span>
										<span style={{ color: 'green' }}>
											{reportingTime.time} {reportingTime.date}
										</span>
									</p>
									<p
										style={{
											fontSize: '16px',
											fontWeight: 'bold',
											margin: '5px 0',
										}}
									>
										<span>We will take booking till</span>
										<span style={{ color: 'red' }}>
											{' '}
											{bookingDeadline.time} {bookingDeadline.date}
										</span>
									</p>
								</Col>
								<Col md={24} lg={12}>
									<p
										style={{
											fontSize: '16px',
											fontWeight: 'bold',
											margin: '5px 0',
										}}
									>
										<span>Our journey will be </span>
										<span style={{ color: 'green' }}>
											{`for ${info?.duration}`}
										</span>
									</p>
									<p
										style={{
											fontSize: '16px',
											fontWeight: 'bold',
											margin: '5px 0',
										}}
									>
										<span>We will provide you total </span>
										<span style={{ color: 'green' }}> {info?.meals}</span>
									</p>
								</Col>
							</Row>
						</div>
					</Col>
					<Col lg={12} sm={24}>
						<div>
							<h2>Basic Details</h2>
							<hr />
							<div>
								<p
									style={{
										margin: '5px 0',
										fontSize: '16px',
										fontWeight: 'bold',
									}}
								>
									The Spots we will cover
								</p>
								{info?.coverLocations?.map(
									(location: string, index: number) => (
										<Tag
											color="green"
											key={index}
											style={{
												margin: '5px 0',
												marginRight: '15px',
												padding: '5px',
												fontSize: '16px',
												fontWeight: 'bold',
											}}
										>
											{location}
										</Tag>
									)
								)}
							</div>
							<div>
								<p
									style={{
										margin: '5px 0',
										fontSize: '16px',
										fontWeight: 'bold',
									}}
								>
									The events you can experience
								</p>
								{info?.events?.map((event: string, index: number) => (
									<Tag
										color="blue"
										key={index}
										style={{
											margin: '5px 0',
											marginRight: '10px',
											padding: '5px',
											fontSize: '16px',
											fontWeight: 'bold',
										}}
									>
										{event}
									</Tag>
								))}
							</div>
							<div>
								<p
									style={{
										margin: '5px 0',
										fontSize: '16px',
										fontWeight: 'bold',
									}}
								>
									The Activities you must avoid
								</p>
								{info?.notAllowed?.map((notAllow: string, index: number) => (
									<Tag
										color="red"
										key={index}
										style={{
											margin: '5px 0',
											marginRight: '15px',
											padding: '5px',
											fontSize: '16px',
											fontWeight: 'bold',
										}}
									>
										{notAllow}
									</Tag>
								))}
							</div>
						</div>
					</Col>
					<div style={{ padding: '10px' }}>
						<h2 style={{ margin: '5px 0' }}>Description</h2>
						<p style={{ fontSize: '16px' }}>{info?.description}</p>
					</div>
				</Row>
			</Card>
			<FloatButton.BackTop type="primary" tooltip={<div>Go to top</div>} />
		</div>
	);
};

export default PlanDetails;
