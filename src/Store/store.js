import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Features/Users/Store/user-slice';
import { credentialReducer } from '../Features/Login/Store/credential-slice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    credential: credentialReducer,
  },
});

export default store;
