'use client';
import { getStripeSecret } from '@/helpers/config/envConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart, decreaseQuantity } from '@/redux/slice/orderSlice';
import { formateDateAndTime } from '@/services/timeFormater';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { ICheckoutProps } from '../../types';
import CheckoutForm from '../checkoutForm/CheckoutForm';

const stripeSecret = getStripeSecret()
const stripePromise = loadStripe(stripeSecret);
const Checkout = ({ setStep }: ICheckoutProps) => {

	const router = useRouter();
	const { plan, quantity } = useAppSelector((state) => state.orderSummary);
	const dispatch = useAppDispatch();
	const startingTime = formateDateAndTime(plan.departureTime);
	
	return (
		<div>
			<div>
				<Row gutter={15}>
					<Col sm={24} md={12}>
						<Card>
							{quantity ? (
								<>
									<h2 style={{ marginBottom: '10px' }}>{plan?.plan_name}</h2>
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
											fontSize: '18px',
											fontWeight: 'bold',
										}}
									>
										Total booking : {quantity}
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<CaretUpOutlined
												onClick={() => dispatch(addToCart(plan))}
												style={{
													color: 'var(--button-color)',
													fontSize: '18px',
													cursor: 'pointer',
												}}
											/>
											<CaretDownOutlined
												onClick={() => dispatch(decreaseQuantity())}
												style={{
													color: 'red',
													fontSize: '18px',
													cursor: 'pointer',
												}}
											/>
										</div>
										{quantity > 1 ? 'Seats' : 'Seat'}
									</span>
									<div style={{ fontSize: '17px', fontWeight: 'bold' }}>
										<p>Starting point: {plan.departureFrom}</p>
										<p>Reporting time : {startingTime.time}</p>
										<p>Reporting Date : {startingTime.date}</p>
										<p>
											Amount : {plan.price} * {quantity}{' '}
										</p>
										<p>Total : $ {(quantity * plan.price).toFixed(2)} </p>
									</div>
								</>
							) : (
								<>
									<h1>No plan in cart</h1>
									<Button type="primary" onClick={() => router.push('/')}>
										Select a plan
									</Button>
								</>
							)}
						</Card>
					</Col>
					<Col sm={24} md={12}>
						<Card>
							  <Elements stripe={stripePromise}>
								<CheckoutForm quantity={quantity} planId={ plan.id} />
                                    </Elements>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Checkout;
