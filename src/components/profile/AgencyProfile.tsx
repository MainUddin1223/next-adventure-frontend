'use client';
import {
	EnvironmentOutlined,
	StarFilled,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import Link from 'next/link';
import styles from './profile.module.css';

const AgencyProfile = ({ data }: any) => {
	return (
		<div>
			{/* desktop */}
			<div className={styles.profile_container}>
				<Card style={{ width: '100%' }}>
					<div className={styles.profile_image_container}>
						{data?.profileImg ? (
							<Avatar src={data.profileImg} size={120} />
						) : (
							<Avatar size={120} icon={<UserOutlined />} />
						)}
						<div>
							<h3 className={styles.agency_name}>{data?.name}</h3>
							<div className={styles.profile_info}>
								<div>
									<p>
										<EnvironmentOutlined /> {data?.location}
									</p>
									<div className={styles.rating_section}>
										<StarFilled style={{ color: 'var(--primary-color)' }} />
										<p>{data.rating}</p>
									</div>
									<p>Reviews : {data.totalReviews}</p>
								</div>
								<div>
									<p>Email : {data?.auth?.email}</p>
									<p>Phone : {data?.contactNo}</p>
									<p>Status : {data?.featured ? 'featured' : 'Not featured'}</p>
								</div>
							</div>{' '}
						</div>
					</div>
					<hr style={{ margin: '20px 0' }} />
					<div>
						<h3 style={{ fontSize: '1.3rem' }}>About</h3>
						<p style={{ margin: '20px 0', fontSize: '17px' }}>{data?.about}</p>
					</div>
					<div className={styles.edit_button}>
						<Link href={`profile/edit`}>
							<Button type="primary">Edit Profile</Button>
						</Link>
					</div>
				</Card>
			</div>
		</div>
	);
};
export default AgencyProfile;
