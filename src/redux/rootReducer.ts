import { baseApi } from "./api/baseApi";
import orderSlice from "./slice/orderSlice";
import planSlice from "./slice/planSlice";

export const reducer = {
    orderSummary: orderSlice,
    planState: planSlice,
    [baseApi.reducerPath]: baseApi.reducer
}