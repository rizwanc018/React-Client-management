import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
// import adminAuthReducer from './slices/adminAuthSlice';
import adminReducer from './slices/adminSlice'
import { apiSlice, apiSliceAdmin } from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        id: adminReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer

    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware()
        .concat([apiSlice.middleware, apiSliceAdmin.middleware])),
    devTools: true,
})

export default store