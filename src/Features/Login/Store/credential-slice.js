import { createSlice } from '@reduxjs/toolkit';

const credential = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setCredential(state, action) {
      return action.payload;
    },
  },
});

export const { setCredential } = credential.actions;
export const credentialReducer = credential.reducer;
