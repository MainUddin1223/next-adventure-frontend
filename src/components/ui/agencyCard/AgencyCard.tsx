import { isLoggedIn } from '@/services/auth.service';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Rate, Tooltip } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { IAgencyProps } from '../types';
import styles from './AgencyStyle.module.css';

const AgencyCard = ({ agency }: IAgencyProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const isLoggedInUser = isLoggedIn();
	const rating = Number(agency.rating);
	localStorage.removeItem('prevRoute');

	return (
		<div
			className={styles.agency_container}
			onClick={() => {
				!isLoggedInUser && localStorage.setItem('prevRoute', pathname);
				router.push(`/agencies/${agency.id}`);
			}}
		>
			<div>
				<div>
					<Image
						className={styles.agency_img}
						src={agency?.profileImg}
						alt="agency_img"
						height={100}
						width={100}
					/>
				</div>
				<div className={styles.agency_details}>
					<div className={styles.desktop_header}>
						{agency.name.length > 25 ? (
							<Tooltip placement="topLeft" title={agency.name}>
								<h3>{agency.name.substring(0, 25)}...</h3>
							</Tooltip>
						) : (
							<h3>{agency.name}</h3>
						)}
					</div>
					<h3 className={styles.mobile_header}>{agency.name}</h3>
					<Rate
						disabled
						style={{ color: 'var(--primary-color)', padding: '5px 0' }}
						defaultValue={rating === 0 ? 5 : rating}
					/>
					<p style={{ fontWeight: 'bold', padding: '5px 0' }}>
						{agency?.ongoingPlans > 0 ? (
							<p>
								<span style={{ color: 'var(--primary-color)' }}>
									{agency?.ongoingPlans}
								</span>{' '}
								Active plans
							</p>
						) : (
							<p>No active plan</p>
						)}
					</p>
					<p style={{ padding: '5px 0', display: 'flex', gap: '5px' }}>
						<EnvironmentOutlined style={{ color: 'var(--primary-color)' }} />{' '}
						<p>{agency.location}</p>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AgencyCard;
