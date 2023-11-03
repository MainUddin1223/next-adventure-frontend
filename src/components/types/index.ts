import { ReactElement, ReactNode } from 'react';
import { SubmitHandler } from 'react-hook-form';

export type FormConfig = {
	defaultValues?: Record<string, any>;
	resolver?: any;
};

export type FormProps = {
	children?: ReactElement | ReactNode;
	submitHandler: SubmitHandler<any>;
} & FormConfig;

export type FormValues = {
	id: string;
	password: string;
};
