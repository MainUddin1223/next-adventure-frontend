'use client';
import login_img from '@/assets/login.png';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { loginSchema } from '@/schemas/auth';
import { getUserInfo, storeUserInfo } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Modal, Row, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Form from '../../form/Form';
import FormInput from '../../form/FormInput';
import { FormValues } from '../../types';
import PublicLayout from '../PublicLayout';
import BackButton from '../buttons/BackButton';
import PerLoader from '../loader/PreLoader';
import styles from './Login.module.css';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [userLogin] = useUserLoginMutation();

	const onsubmit: SubmitHandler<FormValues> = async (data: any) => {
		try {
			setIsLoading(true);
			const res = await userLogin({ ...data }).unwrap();
			if (res?.accessToken) {
				const accessToken = res?.accessToken;
				storeUserInfo(accessToken);
				typeof window !== 'undefined' &&
					res?.profileData?.profileImg &&
					localStorage.setItem('profile_img', res?.profileData?.profileImg);
				const authInfo: any = await getUserInfo();
				message.success('User logged in successfully');
				setIsLoading(false);
				typeof window !== 'undefined' && localStorage.removeItem('prevRoute');
				const redirectUrl =
					typeof window !== 'undefined' && localStorage.getItem('redirectTo');
				if (redirectUrl) {
					router.push(redirectUrl);
				} else {
					router.push(`${authInfo?.role}/profile`);
				}
			}
			if (!res.success) {
				setIsLoading(false);
				Modal.error({
					content: 'Failed to login',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PublicLayout>
			<div className={styles.login_container}>
				<BackButton />
				<Card>
					{isLoading && <PerLoader />}
					<Row justify="center" align="middle">
						<Col xs={24} sm={10} md={8} span={12}>
							<h1 style={{ margin: '15px 0' }}>Login your account</h1>
							<div>
								<Form
									submitHandler={onsubmit}
									resolver={yupResolver(loginSchema)}
								>
									<div style={{ margin: '15px 0' }}>
										<FormInput
											name="email"
											type="text"
											size="large"
											label="User email"
										/>
									</div>
									<div style={{ margin: '15px 0' }}>
										<FormInput
											name="password"
											type="password"
											size="large"
											label="User Password"
										/>
									</div>
									<Button type="primary" htmlType="submit">
										Login
									</Button>
								</Form>
								<p style={{ marginTop: '20px', textAlign: 'right' }}>
									New to Next Adventure?<Link href="/signup">Sign up</Link>
								</p>
								<p style={{ marginTop: '20px', textAlign: 'right' }}>
									<Link href="/register">Register as Tour Planner</Link>
								</p>
							</div>
						</Col>
						<Col xs={24} sm={10} md={8} span={12}>
							<Image
								layout="responsive"
								src={login_img}
								width={500}
								height={500}
								alt="login_img"
							/>
						</Col>
					</Row>
				</Card>
			</div>
		</PublicLayout>
	);
};

export default Login;
