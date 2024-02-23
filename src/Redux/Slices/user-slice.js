import { createSlice } from '@reduxjs/toolkit';
export const initialUser = {
  id: '',
  name: '',
  email: '',
  age: '',
  mobNum: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selUser: initialUser,
    deleteUser: null,
    selUserIndex: null,
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
    setSelUserIndex(state, action) {
      state.selUserIndex = action.payload;
    },
    setNextUser(state) {
      let nextUserIndex = state.selUserIndex + 1;
      let user = state.users[nextUserIndex];
      state.selUser = user;
      state.selUserIndex = nextUserIndex;
    },
    setPrevUser(state) {
      let prevUserIndex = state.selUserIndex - 1;
      let user = state.users[prevUserIndex];
      state.selUser = user;
      state.selUserIndex = prevUserIndex;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
