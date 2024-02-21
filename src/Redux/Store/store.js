import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Slices/user-slice';
import { uiReducer } from '../Slices/ui-slice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    ui: uiReducer,
  },
});

export default store;
