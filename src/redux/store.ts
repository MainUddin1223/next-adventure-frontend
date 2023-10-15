import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '@/redux/rootReducer'
import { baseApi } from './api/baseApi'
import orderSlice from './slice/orderSlice'

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch