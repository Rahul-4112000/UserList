import { createSlice } from '@reduxjs/toolkit';

const credential = createSlice({
  name: 'activeUser',
  initialState: null,
  reducers: {
    addCredential(state, action) {
      return action.payload;
    },
  },
});

export const { addCredential } = credential.actions;
export const credentialReducer = credential.reducer;
