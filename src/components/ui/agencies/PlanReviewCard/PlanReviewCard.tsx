import {
	EnvironmentOutlined,
	StarFilled,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import Image from 'next/image';

const PlanReviewCard = ({ review }: { review: any }) => {
	return (
		<div
			style={{
				backgroundColor: 'var(--accent-color)',
				boxShadow:
					'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
				padding: '10px',
			}}
		>
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
						<div style={{ display: 'flex', gap: '5px', margin: '5px 0' }}>
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
};

export default PlanReviewCard;
