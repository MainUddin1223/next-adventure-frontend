'use client';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required(),
	})
	.required();

import { Button, Card, Rate, message } from 'antd';
import { useState } from 'react';
import Form from '@/components/form/Form';
import FormTextArea from '@/components/form/FormTextArea';
import RatingCompo from '../../rating/RatingCompo';
import { reviewSchema } from '@/schemas/auth';
import { useLeaveReviewMutation } from '@/redux/api/userApi';

const LeaveReview = () => {
	const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
	type IReviewData = {
		review_description: string;
		rating: number;
	};
	const [leaveReview] = useLeaveReviewMutation();
	const onsubmit = async (data: IReviewData) => {
		const result = await leaveReview(data);
		//@ts-ignore
		const status = result.data.success;
		console.log(status);
		if (status) {
			message.success('Successfully submit the review');
		}
	};
	return (
		<div style={{ marginTop: '20px' }}>
			<Form submitHandler={onsubmit} resolver={yupResolver(reviewSchema)}>
				<Card style={{ textAlign: 'center' }}>
					<div
						style={{
							display: 'inline-block',
							padding: '10px',
							justifyContent: 'center',
						}}
					>
						<h1>Share your user experiance</h1>
						<div>
							<div style={{ margin: '10px 0' }}>
								<strong>Rate your experiance</strong> <br />
								<RatingCompo desc={desc} name="rating" />
							</div>
							<div>
								<strong>Please write your experiance</strong>
								<FormTextArea
									name="review_description"
									rows={5}
									placeholder="Write your experiance"
								/>
							</div>
						</div>
						<Button
							style={{ marginTop: '15px' }}
							type="primary"
							htmlType="submit"
						>
							Submit
						</Button>
					</div>
				</Card>
			</Form>
		</div>
	);
};

export default LeaveReview;
