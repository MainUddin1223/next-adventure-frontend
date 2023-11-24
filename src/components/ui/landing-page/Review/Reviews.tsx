'use client';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	StarFilled,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import AliceCarousel from 'react-alice-carousel';
import styles from './Review.module.css';

const Reviews = ({ reviews }: any) => {
	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 3 },
		1200: { items: 4 },
	};

	const items = reviews?.reviews.map((review: any) => {
		return (
			<div style={{ margin: '10px', maxWidth: '350px' }}>
				<Card className={styles.reviews}>
					{review?.user?.profile_img ? (
						<Image
							src={review?.user?.profile_img}
							alt="review-img"
							width={80}
							height={80}
							style={{ borderRadius: '50%', marginBottom: '10px' }}
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
					{review?.user?.name ? (
						<h3 style={{ margin: '5px 0', fontSize: '19px' }}>
							{review?.user?.name}
						</h3>
					) : (
						<h3 style={{ margin: '5px 0', fontSize: '19px' }}>Person</h3>
					)}
					<div style={{ margin: '10px 0' }}>
						{Array.from({ length: review?.rating }, (_, index) => (
							<StarFilled
								key={index}
								style={{ color: 'var(--button-color)' }}
							/>
						))}
					</div>
					<p style={{ lineHeight: '25px', fontSize: '17px' }}>
						{review?.feedback}
					</p>
				</Card>
			</div>
		);
	});

	return (
		<div className={styles.reviews_container}>
			<h1 style={{ fontSize: '2rem', margin: '20px 0' }}>Happy Clients</h1>
			<hr style={{ color: 'gray' }} />
			<div style={{ margin: '25px 0' }}>
				<AliceCarousel
					disableDotsControls={true}
					infinite={true}
					autoPlay={true}
					autoPlayInterval={3500}
					renderPrevButton={(e) => {
						return (
							!e.isDisabled && (
								<div
									style={{
										position: 'absolute',
										right: '40px',
										fontSize:'20px',
										backgroundColor: "var(--accent-color)",
									padding: "5px 15px",
									boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
										cursor: 'pointer',
									marginRight:"25px"
									}}
								>
									<ArrowLeftOutlined
										style={{  color: 'var(--button-color)' }}
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
											fontSize:'20px',
										backgroundColor: "var(--accent-color)",
									padding: "5px 15px",
									boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
										cursor: 'pointer'
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
			</div>
		</div>
	);
};

export default Reviews;
