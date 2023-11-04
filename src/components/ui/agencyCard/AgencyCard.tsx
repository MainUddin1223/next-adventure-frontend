import { isLoggedIn } from '@/services/auth.service';
import { Rate, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { IAgencyType } from '../types';
import styles from './AgencyStyle.module.css';

const AgencyCard = ({ agency }: IAgencyType) => {
	const router = useRouter();
	const pathname = usePathname();
	const isLoggedInUser = isLoggedIn();
	!isLoggedInUser && localStorage.setItem('prevRoute', pathname);
	const agencyFullName = `${agency?.first_name} ${agency?.last_name}`;
	return (
		<div
			style={{ position: 'relative' }}
			onClick={() => router.push(`/agencies/${agency.id}`)}
		>
			<div
				className={styles.popular_agency_card}
				style={{ backgroundImage: `url(${agency?.profile_img})` }}
			>
				<div className={styles.shadow_div}>
					<div className={styles.agency_details}>
						{agencyFullName.length > 15 ? (
							<Tooltip placement="topLeft" title={agencyFullName}>
								<h3>{agencyFullName.substring(0, 15)}...</h3>
							</Tooltip>
						) : (
							<h3>{agencyFullName}</h3>
						)}
						<Rate
							disabled
							style={{ color: 'var(--primary-color)' }}
							defaultValue={4}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgencyCard;
