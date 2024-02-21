import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selUser: null,
    deleteUser: null,
  },
  reducers: {
    addInitialUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    removeUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUserData(state, action) {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },
    addSelUser(state, action) {
      state.selUser = action.payload;
    },
    addDelUser(state, action) {
      state.deleteUser = action.payload;
    },
    closeForm(state) {
      state.selUser = null;
    },
    closeDeleteDialog(state) {
      state.deleteUser = null;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
