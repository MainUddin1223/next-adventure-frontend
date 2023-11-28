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
	!isLoggedInUser && localStorage.setItem('prevRoute', pathname);
	return (
		<div
			onClick={() => router.push(`/agencies/${agency.id}`)}
			style={{boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}
		>
			<div>
				<div >
					<Image className={styles.agency_img} src={agency?.profileImg} alt='agency_img' height={100} width={100} />
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
							style={{ color: 'var(--primary-color)' }}
							defaultValue={rating === 0 ? 5 : rating}
						/>
					<p style={{fontWeight:'bold'}}>{agency?.ongoingPlans > 0 ? <p><span style={{color:"var(--primary-color)"}}>{ agency?.ongoingPlans}</span> Active plans</p>:<p>No active plan</p>}</p>
					<p><EnvironmentOutlined /></p>
					</div>
			</div>
		</div>
	);
};

export default AgencyCard;
