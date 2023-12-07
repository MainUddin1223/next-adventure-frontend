'use client';

import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormTextArea from '@/components/form/FormTextArea';
import { useRegisterAgencyMutation } from '@/redux/api/authApi';
import { registerSchema } from '@/schemas/auth';
import { getUserInfo, storeUserInfo } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Modal, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import RegisterImageUploader from '../ImageUploader/RegisterImageUploader';
import PublicLayout from '../PublicLayout';
import PerLoader from '../loader/PreLoader';
import { IRegisterFormValues } from '../types';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const [registerAgency] = useRegisterAgencyMutation();

	const onsubmit: SubmitHandler<IRegisterFormValues> = async (data: any) => {
		try {
			setIsLoading(true);
			const res = await registerAgency(data).unwrap();
			if (res?.accessToken) {
				const accessToken = res?.accessToken;
				await storeUserInfo(accessToken);
				const authInfo: any = getUserInfo();
				setIsLoading(false);
				router.push(`${authInfo?.role}/profile`);
				message.success('Registration successful');
			}
			if (!res.success) {
				setIsLoading(false);
				Modal.error({
					content: 'Registration Failed',
				});
			}
		} catch (error) {}
	};

	return (
		<PublicLayout>
			<Card style={{ width: '80%', margin: '0 auto', marginTop: '30px' }}>
				{isLoading && <PerLoader />}
				<div className={styles.form_container}>
					<h1 style={{ margin: '15px 0' }}>Register Agency</h1>
					<div>
						<Form
							submitHandler={onsubmit}
							resolver={yupResolver(registerSchema)}
						>
							<Row gutter={20}>
								<Col sm={24} md={24}>
									<div style={{ margin: '15px 0' }}>
										<RegisterImageUploader name={'profileImg'} />
									</div>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="name"
										type="text"
										size="large"
										label="First name"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="email"
										type="email"
										size="large"
										label="Email"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="password"
										type="password"
										size="large"
										label="Password"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="location"
										type="password"
										size="large"
										label="Location"
									/>
								</Col>
								<Col sm={24} md={12} style={{ margin: '5px 0' }}>
									<FormInput
										name="contactNo"
										type="text"
										size="large"
										label="Contact no"
									/>
								</Col>
								<Col sm={24} md={24}>
									<div style={{ margin: '15px 0' }}>
										<FormTextArea
											name="about"
											rows={6}
											placeholder="About..."
											label="About"
										/>
									</div>
								</Col>
							</Row>
							<Button
								type="primary"
								htmlType="submit"
								style={{ margin: '10px 0' }}
							>
								Register
							</Button>
						</Form>
					</div>
				</div>
			</Card>
		</PublicLayout>
	);
};

export default RegisterForm;
