'use client';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormConfig, FormProps } from '../types';

const Form = ({
	children,
	submitHandler,
	defaultValues,
	resolver,
}: FormProps) => {
	const formConfig: FormConfig = {};

	if (!!defaultValues) formConfig['defaultValues'] = defaultValues;
	if (!!resolver) formConfig['resolver'] = resolver;

	const methods = useForm<FormConfig>(formConfig);
	const { handleSubmit, reset } = methods;

	const onSubmit = (data: any) => {
		submitHandler(data);
		reset();
	};

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset, methods]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default Form;
