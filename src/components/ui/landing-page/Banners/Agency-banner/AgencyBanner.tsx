'use client';
import offering_agency_img from '@/assets/caption.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './AgencyBanner.module.css';

const AgencyBanner = () => {
	const router = useRouter();
	return (
		<div className={styles.offering_container}>
			<Row
				align={'middle'}
				justify={'center'}
				className={styles.offering_row_container}
			>
				<Col
					xs={24}
					sm={24}
					md={12}
					lg={12}
					className={styles.offering_details_container}
				>
					<h1>Choose your Tour Planner</h1>
					<h2 style={{ fontSize: '1.8em', color: 'rgb(47, 46, 46)' }}>
						Make your tour worthy
					</h2>
					<Link
						href="/agencies"
						style={{
							fontSize: '1.3em',
							color: 'var(--button-color)',
							marginBottom: '20px',
						}}
					>
						<h3>
							Explore Agencies <ArrowRightOutlined />
						</h3>{' '}
					</Link>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12}>
					<Image
						src={offering_agency_img}
						width={500}
						layout="responsive"
						alt="offeringImg"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default AgencyBanner;
