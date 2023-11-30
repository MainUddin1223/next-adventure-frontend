'use client';

import { getUserInfo } from '@/services/auth.service';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Thankyou = () => {
	const authInfo: any = getUserInfo();
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push(`${authInfo?.role}/schedules`);
		}, 3000);
	}, []);

	return (
		<div style={{ display: 'block', margin: '0 auto' }}>
			<Card>
				<h1>Congratulations !!!</h1>
				<h3>You have successfully booked the plan</h3>
				{/* <Button></Button> */}
			</Card>
		</div>
	);
};

export default Thankyou;
