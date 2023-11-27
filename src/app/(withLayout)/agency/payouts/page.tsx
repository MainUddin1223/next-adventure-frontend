'use client';
import { useGetPayoutsQuery } from '@/redux/api/agencyApi';
import { Card } from 'antd';

const Payouts = () => {
	const { data, isLoading } = useGetPayoutsQuery(undefined);
	console.log(data);
	return (
		<div>
			<Card>
				<h1 style={{ textAlign: 'center' }}>Payoutsg Coming Soon...</h1>
			</Card>
		</div>
	);
};

export default Payouts;
