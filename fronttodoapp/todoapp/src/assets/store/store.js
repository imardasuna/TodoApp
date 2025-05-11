import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,  // authSlice'ı store'a ekliyoruz
  },
});

export default store;
