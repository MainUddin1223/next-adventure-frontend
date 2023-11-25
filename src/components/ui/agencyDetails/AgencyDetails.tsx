'use client';
import { useGetAgencyByIdQuery } from '@/redux/api/userApi';
import { Card, Col, FloatButton, Rate, Row } from 'antd';
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
console.log(data)
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
									{data?.name}
								</span>
							</h1>
							<h4 style={{ fontSize: '1.3rem' }}>
								Contact no: {data?.contactNo}
							</h4>
							<Rate disabled defaultValue={5} />
							{/* {Array.from({ length: data?.rating || 5 }, (_, index) => (
								<p>
									Rating : <StarFilled
									key={index}
									style={{ color: 'var(--button-color)' }}
								/>
								</p>
							))} */}
							<p style={{ marginTop: '20px', fontSize: '18px' }}>
								{data?.about}
							</p>
						</div>
					</Col>
					<Col>
						<div style={{ maxWidth: '350px' }}>
							<Image
								src={data?.profileImg}
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
								<Col key={plan.id} xs={24} sm={24} md={8} lg={8}>
									<PlanCard plan={plan} agencyProfile/>
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
