'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { getErrorMessageByPropartyName } from '@/utils/schemaValidator';

interface IFormDatePickerProps {
	onChange?: (valOne: any, valTwo: any) => void;
	name: string;
	value?: Dayjs;
	label?: string;
	size: 'large' | 'small';
}

const FormDatePicker = ({
	name,
	label,
	onChange,
	size,
}: IFormDatePickerProps) => {
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();

	const errorMessage = getErrorMessageByPropartyName(errors, name);

	const handleOnChange: DatePickerProps['onChange'] = (date, dateString) => {
		onChange ? onChange(date, dateString) : null;
		const formatedDate = dayjs(dateString).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
		if (formatedDate === 'Invalid Date') {
			setValue(name, undefined);
		} else {
			setValue(name, formatedDate);
		}
	};
	return (
		<div className={`flex flex-col w-full`}>
			{label ? label : null}
			<br />
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<DatePicker
						showTime
						size={size}
						onChange={handleOnChange}
						style={{ width: '100%' }}
					/>
				)}
			/>
			<small style={{ color: 'red' }}>{errorMessage}</small>
		</div>
	);
};

export default FormDatePicker;
