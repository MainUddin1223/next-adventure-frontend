'use client';

import Form from '@/components/form/Form';
import FormDatePicker from '@/components/form/FormDatePicker';
import FormInput from '@/components/form/FormInput';
import FormTextArea from '@/components/form/FormTextArea';
import TagMaker from '@/components/form/TagMaker';
import { useCreateTourPlanMutation } from '@/redux/api/agencyApi';
import { planFormSchema } from '@/schemas/planForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Modal, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import PerLoader from '../loader/PreLoader';
import styles from './CreateTourPlan.module.css';
import TourImagesUploader from './TourImages';

const CreateTourPlan = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const [createTourPlan] = useCreateTourPlanMutation();

	const onsubmit: SubmitHandler<any> = async (data: any) => {
		try {
			setIsLoading(true);
			const res = await createTourPlan(data).unwrap();
			if (res?.success) {
				setIsLoading(false);
				router.push(`profile`);
				message.success('Tour plan listed successfully');
			}
			if (!res.success) {
				setIsLoading(false);
				Modal.error({
					content: 'Failed',
				});
			}
		} catch (error) {}
	};

	return (
		<div>
			<Card style={{ margin: '0 auto', marginTop: '30px' }}>
				{isLoading && <PerLoader />}
				<div className={styles.form_container}>
					<h1 style={{ margin: '15px 0' }}>Create tour plan</h1>
					<div>
						<Form
							submitHandler={onsubmit}
							resolver={yupResolver(planFormSchema)}
						>
							<Row gutter={20}>
								<Col sm={24} md={24}>
									<div style={{ margin: '15px 0' }}>
										<TourImagesUploader name={'images'} />
									</div>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="planName"
										type="text"
										size="large"
										label="Plan name"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="totalSeats"
										type="number"
										size="large"
										label="Total seats"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="departureFrom"
										type="text"
										size="large"
										label="Start from"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="destination"
										type="text"
										size="large"
										label="Tour Destination"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="price"
										type="number"
										size="large"
										label="Plan Price"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormDatePicker
										name="deadline"
										size="large"
										label="Booking Deadline"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormDatePicker
										name="departureTime"
										size="large"
										label="Start time"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="meals"
										type="text"
										size="large"
										label="Total Meals"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="duration"
										type="text"
										size="large"
										label="Tour duration"
									/>
								</Col>
								<Col sm={24} md={24} style={{ margin: '5px 0' }}>
									<TagMaker
										name="coverLocations"
										type="number"
										size="large"
										label="Cover locations"
									/>
								</Col>
								<Col sm={24} md={24} style={{ margin: '5px 0' }}>
									<TagMaker
										name="notAllowed"
										type="number"
										size="large"
										label="Not allowed activities"
									/>
								</Col>
								<Col sm={16} md={8} lg={6} style={{ margin: '5px 0' }}>
									<TagMaker
										name="events"
										type="number"
										size="large"
										label="Total events"
									/>
								</Col>

								<Col sm={24} md={24}>
									<div style={{ margin: '15px 0' }}>
										<FormTextArea
											name="description"
											rows={6}
											placeholder="About..."
											label="Tour Description"
										/>
									</div>
								</Col>
							</Row>
							<Button
								type="primary"
								htmlType="submit"
								style={{ margin: '10px 0' }}
							>
								Create Plan
							</Button>
						</Form>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default CreateTourPlan;
