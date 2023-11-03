'use client';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel } from 'antd';
import Image from 'next/image';
import styles from './Review.module.css';

const Reviews = ({ reviews }: any) => {
	return (
		<div className={styles.reviews_container}>
			<h1 style={{ fontSize: '2rem', margin: '20px 0' }}>Happy Clients</h1>
			<hr style={{ color: 'gray' }} />
			<div style={{ margin: '25px 0' }}>
				<Carousel autoplay>
					{reviews?.reviews.map((review: any, i: number) => (
						<div key={i}>
							<Card className={styles.reviews}>
								{review?.user?.profile_img ? (
									<Image
										src={review?.user?.profile_img}
										alt="review-img"
										width={80}
										height={80}
										style={{ borderRadius: '50%' }}
									/>
								) : (
									<Avatar
										style={{
											backgroundColor: 'var(--primary-color)',
											height: '60px',
											width: '60px',
										}}
										icon={<UserOutlined style={{ fontSize: '55px' }} />}
									/>
								)}
								{review?.user?.first_name ? (
									<h3>
										{review?.user?.first_name} {review?.user?.last_name}
									</h3>
								) : (
									<h3>Person</h3>
								)}
								{Array.from({ length: review?.rating }, (_, index) => (
									<StarFilled
										key={index}
										style={{ color: 'var(--button-color)' }}
									/>
								))}
								<p>{review?.review_description}</p>
							</Card>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Reviews;
