import { IMeta } from '@/types'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { instance as AxiosInstance } from './axiosInstance'

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            meta?: IMeta
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
            contentType?: string
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, contentType }) => {
            try {
                const result = await AxiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        'ContentType': contentType || 'application/json'
                    },
                })
                return result
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
