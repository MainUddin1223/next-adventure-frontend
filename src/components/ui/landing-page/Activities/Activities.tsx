import manage_icon from '@/assets/manage-icon.png';
import search_icon from '@/assets/search-icon.png';
import share_icon from '@/assets/share-icon.png';
import { getUserInfo } from '@/services/auth.service';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './activities.module.css';

const Activities = () => {
	const router = useRouter();
	const { role } = getUserInfo() as any;
	return (
		<Row gutter={[20, 20]} className={styles.container}>
			<Col xs={24} md={12} onClick={() => router.push('/agencies')}>
				<div className={styles.activities_container}>
					<div className={styles.activities_image_container} >
					<Image
							src={search_icon}
							alt="search_icon"
							width={20}
							height={20}
							layout="responsive"
						/></div>
					<div style={{fontSize:'1.7rem',textAlign:'center',flex:'1'}}>

					<h3 >Find Tour Planners</h3>
					</div>
				</div>
			</Col>
			<Col xs={24} md={12} onClick={() => router.push('/plans')}>
				<div className={styles.activities_container}>
										<div className={styles.activities_image_container} >
					<Image
							src={search_icon}
							alt="search_icon"
							width={20}
							height={20}
							layout="responsive"
						/></div>
								<div style={{fontSize:'1.7rem',textAlign:'center',flex:'1'}}>
					<h3>Book Plans</h3>
					</div>
				</div>
			</Col>
			<Col
				xs={24}
				md={12}
				onClick={() => router.push(`${role ? `${role}/profile` : '/login'}`)}
			>
				<div className={styles.activities_container}>
										<div className={styles.activities_image_container} >
					<Image
							src={manage_icon}
							alt="manage_icon"
							width={20}
							height={20}
							layout="responsive"
						/></div>
								<div style={{fontSize:'1.7rem',textAlign:'center',flex:'1'}}>
					<h3>Manage Plans</h3>
					</div>
				</div>
			</Col>
			<Col
				xs={24}
				md={12}
				onClick={() => router.push(`${role ? `${role}/profile` : '/login'}`)}
			>
				<div className={styles.activities_container}>
					<div className={styles.activities_image_container}>
						<Image
							src={share_icon}
							alt="share_icon"
							width={50}
							height={50}
							layout="responsive"
						/>
					</div>
					<div style={{ fontSize: '1.7rem', textAlign: 'center', flex: '1' }}>
					<h3>Share Experience</h3>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Activities;
