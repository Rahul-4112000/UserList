import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    error: false,
    successMsg: false,
  },
  reducers: {
    setDialog(state, action) {
      let key = Object.keys(action.payload);
      state[key] = action.payload[key];
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
