import { Alert, Spin } from 'antd';
import React from 'react';

const PerLoader = () => {
	return (
		<div
			style={{
				position: 'absolute',
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
