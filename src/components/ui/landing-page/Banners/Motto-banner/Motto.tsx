import banner from '@/assets/banner.png';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Motto.module.css';

const Motto = () => {
	const router = useRouter();
	return (
		<div style={{ color: 'rgb(59, 58, 58)' }}>
			<Card>
				<div className={styles.plan_banner_container}>
					<Row
						align={'middle'}
						justify={'center'}
						style={{ margin: '20px 0' }}
						gutter={[20, 20]}
					>
						<Col xs={24} md={12} sm={24}>
							<div style={{ margin: '10px auto', textAlign: 'center' }}>
								<h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
									What Sets Us Apart?
								</h1>
								<h3
									style={{ fontSize: '1.2rem', marginBottom: '15px' }}
								>{`We don't just offer a service; We offer you a world of possibilities.`}</h3>
								<Button
									size="large"
									type="primary"
									onClick={() => router.push('/agencies')}
								>
									Explore Us <ArrowRightOutlined />
								</Button>
							</div>
						</Col>
						<Col xs={24} md={12} sm={24}>
							<div style={{ width: '50%', margin: '0 auto' }}>
								<Image
									src={banner}
									alt="banner"
									width={200}
									height={200}
									layout="responsive"
								/>
							</div>
						</Col>
					</Row>
				</div>
			</Card>
		</div>
	);
};

export default Motto;
