import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addInitialUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
    removeUser(state, action) {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUserData(state, action) {
      const userIndex = state.findIndex((user) => user.id === action.payload.id);
      state[userIndex] = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
