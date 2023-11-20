'use client'
import dummy_img from '@/assets/146.jpg';
import { Avatar, Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profile.module.css';

const AgencyProfile = ({data}:any) => {

	return (
		<div>
			{/* desktop */}
			<div className={styles.profile_container}>
				<Card style={{ width: '100%' }}>
					<h1 style={{ margin: '20px 0' }}>
						Welcome{' '}
						<span style={{ textTransform: 'uppercase' }}>{data?.name}</span>
					</h1>
					<div className={styles.profile_image_container}>
						{data?.profileImg ? (
							<Image
								src={data?.profileImg}
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
					<h3>Contact no:</h3> <span>{data?.contactNo}</span>
					<div>
						<h3>Contact no</h3> <span>{data?.contact_no}</span>
					</div>
					<div>
						<h3>Agency status</h3>{' '}
						<span>{data?.featured ? 'featured' : 'Not featured'}</span>
					</div>
					<div>
						<h3>Rating</h3>{' '}
						<span>
							{Number(data?.rating) ? Number(data?.rating) : 'Not applicable'}
						</span>
					</div>
					<div>
						<h3>Total Reviews</h3>{' '}
						<span>
							{data?.totalReviews ? data?.totalReviews : 'Not applicable'}
						</span>
					</div>
					<div>
						<h3>About</h3> <span>{data?.about}</span>
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
							data?.profileImg ? (
								<Image
									src={data?.profileImg}
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
export default AgencyProfile;
