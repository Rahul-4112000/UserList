import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Slices/user-slice';
import { credentialReducer } from '../Slices/credential-slice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    credential: credentialReducer,
  },
});

export default store;
