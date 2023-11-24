'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';

const Hero = () => {
	const router = useRouter();

	return (
		<div className={styles.parallox}>
			<div className={styles.hero_container}>
				{/* <Row gutter={[15,15]} align={'middle'}>
					<Col md={24} lg={12}>
						<Image src={groupImg} alt='group-img' height={100} width={100} layout='responsive'/>
					</Col>
					<Col md={24} lg={12}>
										<div className={styles.banner_info}>

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
					</Col>
					
				</Row> */}
														<div className={styles.banner_info}>

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
