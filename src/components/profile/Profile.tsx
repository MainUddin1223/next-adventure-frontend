'use client';

import { useGetUserProfileQuery } from '@/redux/api/userApi';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import Link from 'next/link';
import PerLoader from '../ui/loader/PreLoader';
import styles from './profile.module.css';

const CommonProfile = () => {
	const { data, isLoading } = useGetUserProfileQuery(undefined);
	return (
		<div>
			{/* desktop */}
			
			{
				isLoading ? <PerLoader /> : 
								<div className={styles.profile_container}>
				<Card style={{ width: '100%' }}>
							<>
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
									<p>Email : {data?.auth?.email}</p>
									<p>
										Phone : {data?.contactNo ? data?.contactNo : 'Not added'}
									</p>
								</div>
							</div>{' '}
						</div>
					</div>
					<hr style={{ margin: '20px 0' }} />
					<div>
						<h3 style={{ fontSize: '1.3rem' }}>About</h3>
						<p style={{ margin: '20px 0', fontSize: '17px' }}>
							{data?.about ? data?.about : 'Not added'}
						</p>
					</div>
					<div className={styles.edit_button}>
						<Link href={`profile/edit`}>
							<Button type="primary">Edit Profile</Button>
						</Link>
					</div>
							</>
				</Card>
			</div>
			}
	

		</div>
	);
};
export default CommonProfile;
