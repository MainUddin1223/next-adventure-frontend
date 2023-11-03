'use client';
import { useGetAgencyByIdQuery } from '@/redux/api/userApi';
import { StarFilled } from '@ant-design/icons';
import { Card, Col, FloatButton, Row } from 'antd';
import Image from 'next/image';
import BackButton from '../buttons/BackButton';
import LoadingSpinner from '../loader/Loader';
import PlanCard from '../planCard/PlanCard';
import styles from './AgencyDetails.module.css';

const AgencyDetailsCompo = ({ id }: { id: number }) => {
	const { data, isLoading } = useGetAgencyByIdQuery(Number(id));

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className={styles.agency_details_container}>
			<BackButton />
			<Card>
				<Row gutter={[15, 15]}>
					<Col xs={24} sm={24} md={12}>
						<div>
							<h1>
								Welcome to my profile. I am <br />
								<span style={{ color: 'var(--primary-color)' }}>
									{data?.first_name} {data?.last_name}
								</span>
							</h1>
							<h4 style={{ fontSize: '1.3rem' }}>
								Contact no : {data?.contact_no}
							</h4>
							{Array.from({ length: data?.rating || 5 }, (_, index) => (
								<StarFilled
									key={index}
									style={{ color: 'var(--button-color)' }}
								/>
							))}
							<p style={{ marginTop: '20px', fontSize: '18px' }}>
								{data?.about_user}
							</p>
						</div>
					</Col>
					<Col>
						<div style={{ maxWidth: '350px' }}>
							<Image
								src={data?.profile_img}
								alt="img"
								width={450}
								height={450}
								layout="responsive"
							/>
						</div>
					</Col>
				</Row>
			</Card>
			<Card>
				<div>
					<h2>Ongoing Tour Plans</h2>
					<div>
						<Row gutter={[25, 25]}>
							{data?.plans?.map((plan: any) => (
								<Col key={plan.id} xs={24} sm={24} md={8} lg={6}>
									<PlanCard plan={plan} />
								</Col>
							))}
						</Row>
					</div>
				</div>
			</Card>
			<FloatButton.BackTop type="primary" tooltip={<div>Go to top</div>} />
		</div>
	);
};

export default AgencyDetailsCompo;
