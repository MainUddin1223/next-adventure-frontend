'use client';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const LogoutBtn = ({ title = false }) => {
	const router = useRouter();

	return (
		<p
			onClick={() => {
				localStorage.clear();
				router.push('/');
			}}
			style={{
				cursor: 'pointer',
			}}
		>
			{!title && (
				<LogoutOutlined style={{ fontSize: '21px', marginRight: '10px' }} />
			)}
			{title && 'Logout'}
		</p>
	);
};

export default LogoutBtn;
