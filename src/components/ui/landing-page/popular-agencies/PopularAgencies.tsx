import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import AgencyCard from '../../agencyCard/AgencyCard';
import styles from './PopularAgencies.module.css';

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 3 },
	1200: { items: 4 },
};

const PopulerAgencies = ({ agencies }: any) => {
	const router = useRouter();
	const featuredAgencies = agencies?.agencies;

	const items = featuredAgencies.map((item: any) => {
		return (
			<div style={{ margin: '10px' }}>
				<AgencyCard agency={item} />
			</div>
		);
	});
	return (
		<div className={styles.popular_agencies_container}>
			<h2 className={styles.header}>Populer planners</h2>
			<p style={{ fontSize: '19px', marginBottom: '10px', fontWeight: 'bold' }}>
				Find your best plan from uncountable options
			</p>
			<hr style={{ color: 'gray' }} />
			<AliceCarousel
				disableDotsControls={true}
				renderPrevButton={(e) => {
					return (
						!e.isDisabled && (
							<div
								style={{
									position: 'absolute',
									right: '40px',
									fontSize: '35px',
								}}
							>
								<ArrowLeftOutlined
									style={{ width: '48px', color: 'var(--button-color)' }}
								/>
							</div>
						)
					);
				}}
				renderNextButton={(e) => {
					return (
						!e.isDisabled && (
							<div
								style={{
									position: 'absolute',
									right: '10px',
									fontSize: '35px',
								}}
							>
								<ArrowRightOutlined style={{ color: 'var(--button-color)' }} />
							</div>
						)
					);
				}}
				items={items}
				responsive={responsive}
				controlsStrategy="alternate"
			/>
			<Button
				onClick={() => router.push('/agencies')}
				size="large"
				style={{ marginTop: '20px' }}
				type="primary"
			>
				See more <ArrowRightOutlined />
			</Button>
		</div>
	);
};

export default PopulerAgencies;
