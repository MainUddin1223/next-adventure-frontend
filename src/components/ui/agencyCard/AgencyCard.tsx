import { isLoggedIn } from '@/services/auth.service';
import { Rate, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { IAgencyProps } from '../types';
import styles from './AgencyStyle.module.css';

const AgencyCard = ({ agency }: IAgencyProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const isLoggedInUser = isLoggedIn();
	const rating = Number(agency.rating)
	!isLoggedInUser && localStorage.setItem('prevRoute', pathname);
	return (
		<div
			style={{ position: 'relative' }}
			onClick={() => router.push(`/agencies/${agency.id}`)}
		>
			<div
				className={styles.popular_agency_card}
				style={{ backgroundImage: `url(${agency?.profileImg})` }}
			>
				<div className={styles.shadow_div}>
					<div className={styles.agency_details}>
						{agency.name.length > 15 ? (
							<Tooltip placement="topLeft" title={agency.name}>
								<h3>{agency.name.substring(0, 15)}...</h3>
							</Tooltip>
						) : (
							<h3>{agency.name}</h3>
						)}
						<Rate
							disabled
							style={{ color: 'var(--primary-color)' }}
							defaultValue={rating === 0? 5 : rating}
							/>
							<p>Ongoing plan : { agency?.ongoingPlans}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgencyCard;
