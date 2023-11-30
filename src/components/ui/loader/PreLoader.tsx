import { Spin } from 'antd';

const PerLoader = () => {
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: '99999',
				top: '50%',
				left: '50%',
				transform: '-50% -50%',
			}}
		>
			<Spin style={{ zIndex: '999' }} size="large"></Spin>
		</div>
	);
};

export default PerLoader;
