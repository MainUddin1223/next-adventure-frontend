import { Button } from 'antd';
import { IConfirmationProps } from '../../types';

const Confirmation = ({ setStep, handleConfirmation }: IConfirmationProps) => {
	return (
		<div style={{ display: 'block', margin: '0 auto' }}>
			<h1>Confirm your booking</h1>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					justifyContent: 'center',
					marginTop: '15px',
				}}
			>
				<Button onClick={() => setStep(0)}>Previous</Button>
				<Button type="primary" onClick={handleConfirmation}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

export default Confirmation;
