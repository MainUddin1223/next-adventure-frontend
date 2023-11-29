'use client';
import {
	useBookPlanMutation,
	useOrderSummaryMutation,
} from '@/redux/api/userApi';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const CheckoutForm = ({
	quantity,
	planId,
}: {
	quantity: number;
	planId: number;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState('');
	const [success, setSuccess] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [orderSummary] = useOrderSummaryMutation();
	const [bookPlan] = useBookPlanMutation();
	const [confirmationModal, setConfirmationModal] = useState(false);
	const order = {
		_id: 1,
		paymentPrice: 500,
		userName: 'xyz',
		userEmail: 'user@gmail.com',
	};
	const router = useRouter();
	const { _id, userName, userEmail } = order;

	const handleOrderSummary = async () => {
		const data: any = await orderSummary({
			data: { totalSeat: quantity },
			id: planId,
		});
		setClientSecret(data?.data?.client_secret);
	};

	useMemo(() => {
		if (quantity || planId) {
			handleOrderSummary();
		}
	}, [quantity, planId]);

	const handleSubmit = async (event: any) => {
		setConfirmationModal(false);
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		console.log(card);
		if (card == null) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		// ERROR
		if (error) {
			setCardError(error.message as string);
			setSuccess('');
			setProcessing(true);
			console.log('[error]', error);
		} else {
			setCardError('');
			console.log('[PaymentMethod]', paymentMethod);
		}
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: userName,
						email: userEmail,
					},
				},
			});
		console.log('intentError', paymentIntent);
		if (intentError) {
			setCardError(intentError?.message as string);
			console.log(intentError);
			setSuccess('');
		} else {
			setCardError('');
			setTransactionId(paymentIntent.id);
			setSuccess('Your payment is complete.');

			const payment = {
				order: _id,
				transactionId: paymentIntent.id,
			};
			const data: any = await bookPlan({
				data: { totalSeat: quantity },
				id: planId,
			});
			router.push(`user/schedules`);
		}
	};
	return (
		<>
			<Modal
				title="Confirmation"
				open={confirmationModal}
				onCancel={() => setConfirmationModal(false)}
				footer={[
					<Button danger onClick={() => setConfirmationModal(false)}>
						Cancel
					</Button>,
					<Button type={'primary'} onClick={handleSubmit}>
						Confirm
					</Button>,
				]}
			>
				<p>Please click on confirm button to book the plan </p>
			</Modal>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>

				<Button
					disabled={!stripe || !elements ? true : false}
					style={{ marginTop: '20px' }}
					type="primary"
					onClick={() => setConfirmationModal(true)}
				>
					Confirm
				</Button>
			</form>
			{cardError && (
				<p style={{ color: 'red', marginTop: '15px' }}>{cardError}</p>
			)}
			{success && (
				<div style={{ color: 'var(--primary-color)', marginTop: '15px' }}>
					<p>{success} </p>
					{/* <p>
						Your transaction Id:{' '}
						<span className="text-success fw-bold">{transactionId}</span>{' '}
					</p> */}
				</div>
			)}
		</>
	);
};

export default CheckoutForm;
