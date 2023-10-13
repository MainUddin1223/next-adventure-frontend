import { IMeta } from ".";

export type ResponseSuccessType = {
    data: any;
    meta?: IMeta
}
export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type ResponseErrorType = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
}