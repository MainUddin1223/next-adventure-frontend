'use client';
import ceo_image from '@/assets/ceo.jpg';
import inverted_comma_1 from '@/assets/inverted-comma-1.png';
import inverted_comma_2 from '@/assets/inverted-comma-2.png';
import Image from 'next/image';
import styles from './CeoSection.module.css';

const CeoSection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.ceo_img_section}>
				<div className={styles.ceo_img}>
					<Image src={ceo_image} width={100} layout="responsive" alt="ceoImg" />
				</div>
			</div>
			<div className={styles.ceo_info}>
				<div className={styles.inverted_comma}>
					<Image
						src={inverted_comma_1}
						width={30}
						layout="responsive"
						alt="inverted_comma_1"
					/>
				</div>
				<h2>Invest Wisely: Quality Over Quantity</h2>
				<p>
					Unlock Unforgettable Adventures: Explore our platform to discover
					top-tier tour planners who will not only make your journey worthwhile
					but also ensure a safe and delightful experience for you.
				</p>
				<div className={styles.inverted_comma}>
					<Image
						src={inverted_comma_2}
						width={30}
						layout="responsive"
						alt="inverted_comma_2"
					/>
				</div>
				<h3 style={{ lineHeight: '35px' }}>Alex Carry</h3>
				<h4>CEO,Next Adventure</h4>
			</div>
		</div>
	);
};

export default CeoSection;
