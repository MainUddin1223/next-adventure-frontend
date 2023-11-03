'use client';

import dummy_img from '@/assets/146.jpg';
import { useGetUserProfileQuery } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/auth.service';
import { Avatar, Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PerLoader from '../ui/loader/PreLoader';
import styles from './profile.module.css';

const CommonProfile = () => {
	const { data, isLoading } = useGetUserProfileQuery(undefined);
	const authInfo: any = getUserInfo();

	if (isLoading) {
		return <PerLoader />;
	}

	return (
		<div>
			{/* desktop */}
			<div className={styles.profile_container}>
				<Card style={{ width: '100%' }}>
					<h1 style={{ margin: '20px 0' }}>
						Welcome{' '}
						<span style={{ textTransform: 'uppercase' }}>
							{data?.first_name} {data?.last_name}
						</span>
					</h1>
					<div className={styles.profile_image_container}>
						{data?.profile_img ? (
							<Image
								src={data?.profile_img}
								style={{ borderRadius: '20px' }}
								width={100}
								height={100}
								layout="responsive"
								alt="dummy"
							/>
						) : (
							<Image
								src={dummy_img}
								style={{ borderRadius: '20px' }}
								width={100}
								height={100}
								layout="responsive"
								alt="dummy"
							/>
						)}
					</div>
					<hr style={{ margin: '20px 0' }} />
					<h3>Email address:</h3> <span>{data?.email}</span>
					<div>
						<h3>Contact no</h3> <span>{data?.contact_no}</span>
					</div>
					<div>
						<h3>About</h3> <span>{data?.about_user}</span>
					</div>
					<div style={{ marginTop: '10px' }}>
						<Link href={`profile/edit`}>
							<Button type="primary">Edit Profile</Button>
						</Link>
					</div>
				</Card>
			</div>
			{/* mobile layout */}
			<div className={styles.profile_container_mobile}>
				<Card style={{ width: '100%' }}>
					<Avatar
						style={{ backgroundColor: 'var(--primary-color)' }}
						size={128}
						icon={
							data?.profile_img ? (
								<Image
									src={data?.profile_img}
									width={100}
									height={100}
									layout="responsive"
									alt="dummy"
								/>
							) : (
								<Image
									src={dummy_img}
									style={{ borderRadius: '20px' }}
									width={100}
									height={100}
									layout="responsive"
									alt="dummy"
								/>
							)
						}
					/>
					<div style={{ position: 'absolute', top: '25px', right: '5px' }}>
						<Link href={`profile/edit`}>
							<Button type="primary">Edit Profile</Button>
						</Link>
					</div>
					<h1 style={{ margin: '20px 0' }}>
						{' '}
						<span style={{ textTransform: 'uppercase' }}>
							{data?.first_name} {data?.last_name}
						</span>
					</h1>
					<hr style={{ margin: '20px 0' }} />
					<h3>Email address:</h3> <span>{data?.email}</span>
					<div>
						<h3>Contact no</h3> <span>{data?.contact_no}</span>
					</div>
					<div>
						<h3>About</h3> <span>{data?.about_user}</span>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default CommonProfile;
