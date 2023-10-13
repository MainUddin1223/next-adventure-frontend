
import { ResponseErrorType, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
const AuthKey = 'accessToken'

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;


// Add a request interceptor
//@ts-ignore
instance.interceptors.request.use(function (config) {

    const accessToken = getFromLocalStorage(AuthKey);
    if (accessToken) {
        config.headers.Authorization = accessToken
    }
    return config;
}, function (error: any) {
    return Promise.reject(error);
});

// Add a response interceptor
//@ts-ignore
instance.interceptors.response.use(function (response) {
    const responseObject: ResponseSuccessType = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }
    return responseObject;

}, function (error: { response: { data: { statusCode: number; message: any; }; }; }) {
    const responseObject: ResponseErrorType = {
        statusCode: error?.response?.data?.statusCode | 500,
        message: error?.response?.data?.message || 'Something went wrong',
        errorMessages: error?.response?.data?.message
    }
    return responseObject;
});



export { instance }