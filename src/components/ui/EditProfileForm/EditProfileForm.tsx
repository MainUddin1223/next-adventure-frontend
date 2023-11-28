'use client';

import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormTextArea from '@/components/form/FormTextArea';
import {
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
} from '@/redux/api/userApi';
import { Button, Card, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import ProfileImageUploader from '../ImageUploader/ImageUploader';
import styles from './EditProfile.module.css';

const EditProfileForm = () => {
	const [userInfo, setUserInfo] = useState({});
	const { data: profileData } = useGetUserProfileQuery(undefined);
	const router = useRouter();

	useEffect(() => {
		setUserInfo({
			name: profileData?.name,
			contactNo: profileData?.contactNo,
			profileImg: profileData?.profileImg,
			about: profileData?.about,
		});
	}, []);

	const [updateUserProfile] = useUpdateUserProfileMutation();

	const onsubmit: SubmitHandler<any> = async (data: any) => {
		const res: any = await updateUserProfile(data);
		setUserInfo(data);
		if (res?.data?.success == true) {
			router.back();
		}
	};
	return (
		<div className={styles.edit_profile_container}>
			<Card>
				<h1 style={{ margin: '15px 0' }}>Update your profile</h1>
				<div>
					<Form submitHandler={onsubmit} defaultValues={userInfo}>
						<div style={{ margin: '15px 0' }}>
							<ProfileImageUploader
								name={'profileImg'}
								defaultUrl={profileData?.profileImg}
							/>
						</div>
						<Row gutter={[20, 20]}>
							<Col xs={24} sm={24} md={12}>
								<div style={{ margin: '15px 0', width: '100%' }}>
									<FormInput
										name="name"
										type="text"
										size="large"
										label="Name"
									/>
								</div>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<div style={{ margin: '15px 0' }}>
									<FormInput
										name="contactNo"
										type="text"
										size="large"
										label="Contact no"
									/>
								</div>
							</Col>
							<Col xs={24} sm={24} md={24}>
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
						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Form>
				</div>
			</Card>
		</div>
	);
};

export default EditProfileForm;
