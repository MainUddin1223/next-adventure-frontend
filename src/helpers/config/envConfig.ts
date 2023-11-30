export const getBaseUrl = (): string => {
	return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
};
export const getStripeSecret = (): string => {
	return (
		process.env.STRIPE_SECRET ||
		'pk_test_51L2vNMJH0mXagrhOdzLEhBYwbNjUZQy6o9TQRQP00TOEqz5YJutO7I2OjEflJDptHPmz9U3iLzgX9sBRtIlYTIB900kUiVeM24'
	);
};
