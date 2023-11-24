import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PlanCard from '../../planCard/PlanCard';
import styles from './featuredTour.module.css';

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 3 },
	1200: { items: 3 },
	1400: { items: 4 },
};

const FeaturedTour = ({ tours }: any) => {
	const plans = tours?.plans;

	const items = plans.map((item: any) => {
		return (
			<div className={styles.planCard_container}>
				<PlanCard plan={item} />
			</div>
		);
	});
	return (
		<div className={styles.featured_container}>
			<h2 className={styles.featured_header}>Featured Plans</h2>
			<p
				style={{
					fontSize: '17px',
					marginBottom: '10px',
					fontWeight: '500',
					lineHeight: '25px',
				}}
			>
				Experience the extraordinary with our tailor-made tour plan amidst
				boundless possibilities. From stunning landscapes to vibrant cities, let
				us craft your dream vacation for an unforgettable adventure.
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
									fontSize: '20px',
									backgroundColor: "var(--accent-color)",
									padding: "5px 15px",
									marginRight:"25px",
									boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
									cursor:'pointer'
								}}
							>
								<ArrowLeftOutlined
									style={{ color: 'var(--button-color)' }}
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
									fontSize: '20px',
									backgroundColor: "var(--accent-color)",
									padding: "5px 15px",
									boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
									cursor:'pointer'
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
		</div>
	);
};

export default FeaturedTour;
