'use client';

import { useAppDispatch, useDebounced } from '@/redux/hooks';
import { serachValueState } from '@/redux/slice/planSlice';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, any> = {};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 2000,
	});
	if (!!debouncedTerm) {
		dispatch(serachValueState(debouncedTerm));
		router.push('/plans');
	}

	return (
		<div className={styles.parallox}>
			<div className={styles.hero_container}>
				<div className={styles.bannner_info}>
					<div className={styles.search_field_container}>
						<Input
							type="text"
							size="large"
							placeholder="Search ... "
							onChange={(e) => setSearchTerm(e.target.value)}
							prefix={<SearchOutlined style={{ color: 'gray' }} />}
						/>
					</div>

					<h1>Enjoy your Holidays</h1>
					<h2>Find the best plan from the uncountable options</h2>
					<Button
						style={{
							display: 'block',
							margin: '20px auto',
							fontWeight: 'bold',
						}}
						size="large"
						type="primary"
						onClick={() => router.push('/agencies')}
					>
						Explore Us <ArrowRightOutlined />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
