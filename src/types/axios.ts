import { IMeta } from '.';

export type ResponseSuccessType = {
	data: any;
	meta?: IMeta;
};
export type IGenericErrorMessage = {
	path: string | number;
	message: string;
};

export type ResponseErrorType = {
	data: {
		success: boolean;
		statusCode: number;
		message: string;
		errorMessages: IGenericErrorMessage[];
	};
};
