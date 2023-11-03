import { Button } from 'antd';
import { IButtonProps } from '../types';

const PrimaryButton = ({ handler, value, disabled }: IButtonProps) => {
	return (
		<Button type="primary" onClick={handler}>
			{value}
		</Button>
	);
};

export default PrimaryButton;
