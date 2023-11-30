'use client';

import { useAppDispatch } from '@/redux/hooks';
import { searchValueState } from '@/redux/slice/planSlice';
import {
	ArrowRightOutlined,
	LoadingOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [searching, setSearching] = useState(false);

	const handleSearch = (value: string) => {
		setSearching(true);
		setTimeout(() => {
			dispatch(searchValueState(value));
			router.push('/plans');
		}, 4000);
	};

	return (
		<div className={styles.parallox}>
			<div className={`${styles.extra_large_layout} ${styles.hero_container}`}>
				<div className={styles.banner_info}>
					<div className={styles.search_field_container}>
						<Input
							size="large"
							prefix={<SearchOutlined />}
							suffix={
								searching && (
									<Spin
										indicator={
											<LoadingOutlined style={{ fontSize: 24 }} spin />
										}
									/>
								)
							}
							type="text"
							placeholder="Search upcoming plans"
							onChange={(e) => handleSearch(e.target.value)}
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
