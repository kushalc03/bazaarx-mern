import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import saleReducer from '../features/sales/saleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: saleReducer,
  },
})
