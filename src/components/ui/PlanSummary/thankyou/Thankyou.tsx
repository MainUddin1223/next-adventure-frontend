'use client';

import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Thankyou = () => {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 3000);
	}, []);

	return (
		<div style={{ display: 'block', margin: '0 auto' }}>
			<Card>
				<h1>Congratulatons !!!</h1>
				<h3>You have successfully booked the plan</h3>
				{/* <Button></Button> */}
			</Card>
		</div>
	);
};

export default Thankyou;
