import { configureStore } from "@reduxjs/toolkit"

import curvaReducer from './slices/curvaSlice'
import userReducer from "./slices/userReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    curva: curvaReducer,
    
  },
})