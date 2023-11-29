'use client';
import { useGetAgencyByIdQuery } from '@/redux/api/userApi';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	EnvironmentOutlined,
	StarFilled,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Empty, FloatButton, Row } from 'antd';
import Image from 'next/image';
import AliceCarousel from 'react-alice-carousel';
import BackButton from '../buttons/BackButton';
import LoadingSpinner from '../loader/Loader';
import PlanCard from '../planCard/PlanCard';
import styles from './AgencyDetails.module.css';

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 3 },
	1200: { items: 3 },
	1400: { items: 4 },
};

const AgencyDetailsCompo = ({ id }: { id: number }) => {
	const { data, isLoading } = useGetAgencyByIdQuery(Number(id));
	if (isLoading) {
		return <LoadingSpinner />;
	}
	const items = data?.planReviews.map((review: any) => {
		return (
			<div style={{ margin: '10px' }}>
				<div style={{}}>
					<div>
						{review?.user?.profileImg ? (
							<Avatar
								style={{
									backgroundColor: 'var(--primary-color)',
									height: '60px',
									width: '60px',
									marginBottom: '10px',
								}}
								icon={
									<Image
										src={review?.user?.profileImg}
										alt="profile"
										width={80}
										height={80}
										style={{ borderRadius: '50%', marginBottom: '10px' }}
									/>
								}
							/>
						) : (
							<Avatar
								style={{
									backgroundColor: 'var(--primary-color)',
									height: '60px',
									width: '60px',
									marginBottom: '10px',
								}}
								icon={<UserOutlined style={{ fontSize: '55px' }} />}
							/>
						)}
					</div>
					<div>
						<h3>{`${review?.user?.name ? review?.user?.name : 'User'}`}</h3>
						<span>
							<div style={{ display: 'flex', gap: '5px' }}>
								{Array.from(
									{ length: Number(review?.rating) || 0 },
									(_, index) => (
										<p>
											<StarFilled
												key={index}
												style={{ color: 'var(--button-color)' }}
											/>
										</p>
									)
								)}{' '}
							</div>
							<p>{review?.feedback}</p>
						</span>
					</div>
				</div>
				<div
					style={{
						margin: '10px 0',
						gap: '10px',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<div>
						<Image
							src={review?.plan?.images[0]}
							alt="planImg"
							height={70}
							width={70}
						/>
					</div>
					<div>
						<h3>{review?.plan?.planName}</h3>
						<h4>
							<EnvironmentOutlined /> {review?.plan?.destination}
						</h4>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div className={styles.agency_details_container}>
			<BackButton />
			<Card>
				<div className={styles.profile_container}>
					<div className={styles.profile_img}>
						<Image
							src={data?.profileImg}
							alt="img"
							width={450}
							height={450}
							layout="responsive"
						/>
					</div>
					<div>
						<h3 className={styles.agency_name}>{data?.name}</h3>
						<p>{data.contactNo}</p>
						<span className={styles.rating_section}>
							<StarFilled style={{ color: 'var(--primary-color)' }} />
							<p>{data.rating}</p>
							<p>{`( ${data.totalReviews} reviews )`}</p>
						</span>
						<p>
							<EnvironmentOutlined /> {data?.location}
						</p>
					</div>
				</div>
				<hr />

				<div>
					<h3 style={{ fontSize: '1.3rem' }}>About me</h3>
					<p style={{ marginTop: '20px', fontSize: '17px' }}>{data?.about}</p>
				</div>
				<div style={{ marginBottom: '25px' }}>
					<h3 style={{ fontSize: '1.3rem', margin: '20px 0' }}>Reviews</h3>
					{data?.planReviews?.length ? (
						<AliceCarousel
							disableDotsControls={true}
							renderPrevButton={(e) => {
								return (
									!e.isDisabled && (
										<div
											style={{
												position: 'absolute',
												right: '40px',
												fontSize: '20px',
												backgroundColor: 'var(--accent-color)',
												padding: '5px 15px',
												marginRight: '25px',
												boxShadow:
													'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
												cursor: 'pointer',
											}}
										>
											<ArrowLeftOutlined
												style={{ color: 'var(--button-color)' }}
											/>
										</div>
									)
								);
							}}
							renderNextButton={(e) => {
								return (
									!e.isDisabled && (
										<div
											style={{
												position: 'absolute',
												right: '10px',
												fontSize: '20px',
												backgroundColor: 'var(--accent-color)',
												padding: '5px 15px',
												boxShadow:
													'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
												cursor: 'pointer',
											}}
										>
											<ArrowRightOutlined
												style={{ color: 'var(--button-color)' }}
											/>
										</div>
									)
								);
							}}
							items={items}
							responsive={responsive}
							controlsStrategy="alternate"
						/>
					) : (
						<div>
							<Empty
								description={
									<p
										style={{
											fontSize: '18px',
											fontWeight: 'bold',
											color: 'GrayText',
										}}
									>
										Yet to be get reviewed
									</p>
								}
							/>
						</div>
					)}
				</div>
			</Card>
			<Card>
				<div>
					<h2 style={{ margin: '15px 0' }}>Ongoing Tour Plans</h2>
					<div>
						<Row gutter={[25, 25]}>
							{data?.plans?.map((plan: any) => (
								<Col key={plan.id} xs={24} sm={24} md={8} lg={8}>
									<PlanCard plan={plan} agencyProfile />
								</Col>
							))}
						</Row>
					</div>
				</div>
			</Card>
			<FloatButton.BackTop type="primary" tooltip={<div>Go to top</div>} />
		</div>
	);
};

export default AgencyDetailsCompo;
