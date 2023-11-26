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
				Discover your ideal tour planner from an endless array of choices.
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
									backgroundColor: 'var(--accent-color)',
									padding: '5px 15px',
									fontSize: '20px',
									boxShadow:
										'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
									cursor: 'pointer',
									marginRight: '25px',
								}}
							>
								<ArrowLeftOutlined style={{ color: 'var(--button-color)' }} />
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
									fontSize: '20px',
									backgroundColor: 'var(--accent-color)',
									padding: '5px 15px',
									boxShadow:
										'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
									cursor: 'pointer',
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
				style={{ marginLeft: '10px' }}
				type="primary"
			>
				See more <ArrowRightOutlined />
			</Button>
		</div>
	);
};

export default PopulerAgencies;
