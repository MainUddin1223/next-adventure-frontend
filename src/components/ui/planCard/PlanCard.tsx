import { isLoggedIn } from '@/services/auth.service';
import { checkValidity } from '@/services/timeFormater';
import {
	DollarOutlined,
	EnvironmentOutlined,
	ExclamationCircleOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Button, Carousel, Rate, Tag, Tooltip } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { IPlanProps } from '../types';
import styles from './PlanCard.module.css';

const contentStyle: React.CSSProperties = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const PlanCard = ({ plan }: IPlanProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const isValidDate = checkValidity(plan?.deadline);
	const isLoggedInUser = isLoggedIn();
	!isLoggedInUser && localStorage.setItem('prevRoute', pathname);

	return (
		<>
			<div className={styles.plan_card_container}>
				{plan?.images.length ? (
					<Carousel>
						{plan?.images.map((img: string, i: number) => (
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
							<h3 style={contentStyle}>No image</h3>
						</div>
					</Carousel>
				)}
				<div className={styles.tour_details}>
					{plan?.planName?.length > 25 ? (
						<Tooltip placement="topLeft" title={plan?.planName}>
							<h4>{plan?.planName.substring(0, 25)}...</h4>
						</Tooltip>
					) : (
						<h4>{plan?.planName}</h4>
					)}
					<strong style={{ fontSize: '16px' }}>
						<DollarOutlined style={{ color: 'var(--button-color)' }} />{' '}
						{plan.price}
					</strong>
					<p style={{ display: 'flex', gap: '10px', fontWeight: 'bold' }}>
						<EnvironmentOutlined style={{ color: 'var(--button-color)' }} />{' '}
						<span style={{ textTransform: 'capitalize' }}>
							{plan?.destination}
						</span>
					</p>
					{isValidDate ? (
						<Tag icon={<SyncOutlined spin />} color="green">
							Booking going on
						</Tag>
					) : (
						<Tag icon={<ExclamationCircleOutlined />} color="error">
							Booking closed
						</Tag>
					)}

					<div>
						<hr />
						<p
							style={{
								display: 'flex',
								gap: '10px',
								fontWeight: 'bold',
								alignItems: 'center',
							}}
						>
							<Image
								src={plan.agency.profileImg}
								alt="profile-img"
								width={40}
								height={40}
								style={{ borderRadius: '50%' }}
							/>
							<span style={{ textTransform: 'capitalize' }}>
								{plan.agency.name}
							</span>
						</p>
						<Rate
							disabled
							style={{ color: 'var(--primary-color)' }}
							defaultValue={plan.agency.rating}
						/>
					</div>
				</div>
				<div>
					<Button
						type="primary"
						style={{ margin: '10px' }}
						onClick={() => router.push(`/plan-details/${plan?.id}`)}
					>
						Details
					</Button>
				</div>
			</div>
		</>
	);
};

export default PlanCard;
