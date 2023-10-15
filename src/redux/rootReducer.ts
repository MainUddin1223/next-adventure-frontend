import { baseApi } from "./api/baseApi";
import orderSlice from "./slice/orderSlice";

export const reducer = {
    orderSummary: orderSlice,
    [baseApi.reducerPath]: baseApi.reducer
}