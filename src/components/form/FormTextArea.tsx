'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { getErrorMessageByPropartyName } from '@/utils/schemaValidator';

interface ITextArea {
	name: string;
	value?: string | string[] | undefined;
	rows: number;
	placeholder?: string;
	label?: string;
}

const FormTextArea = ({ name, value, rows, placeholder, label }: ITextArea) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const errorMessage = getErrorMessageByPropartyName(errors, name);

	return (
		<div className={`flex flex-col w-full`}>
			{label ? label : null}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Input.TextArea
						rows={rows}
						placeholder={placeholder}
						{...field}
						value={value ? value : field.value}
					/>
				)}
			/>
			<small style={{ color: 'red' }}>{errorMessage}</small>
		</div>
	);
};

export default FormTextArea;
