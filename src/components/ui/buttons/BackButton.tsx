'use client';
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
	const router = useRouter();

	return (
		<div style={{ margin: '20px 0' }}>
			<LeftCircleFilled
				onClick={() => {
					const prevUrl =
						typeof window !== 'undefined' && localStorage.getItem('prevRoute');
					typeof window !== 'undefined' &&
						localStorage.removeItem('redirectTo');
					if (prevUrl) {
						router.push(prevUrl);
					} else {
						router.back();
					}
				}}
				style={{
					fontSize: '35px',
					color: 'var(--button-color)',
					zIndex: '99',
					cursor: 'pointer',
				}}
			/>
		</div>
	);
};

export default BackButton;
