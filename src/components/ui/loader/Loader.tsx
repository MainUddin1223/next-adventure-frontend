import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const LoadingSpinner = () => {
	const antIcon = <Loading3QuartersOutlined style={{ fontSize: 100 }} spin />;
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Spin indicator={antIcon} style={{}} />
		</div>
	);
};

export default LoadingSpinner;
