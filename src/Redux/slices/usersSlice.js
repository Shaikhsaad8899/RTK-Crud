import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Define asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4001/api/users'); // Assuming your backend endpoint for fetching users is 'http://localhost:4001/api/users'
  const data = response.data
  console.log(data, "aa")

  return data;
});

// Define asynchronous thunk for adding a new user
export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('http://localhost:4001/api/users', userData); // Assuming your backend endpoint for adding users is '/api/users'
  return response.data;
});

// Define asynchronous thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  const response = await axios.put(`http://localhost:4001/api/users/${userData.id}`, userData); // Assuming your backend endpoint for updating users is '/api/users/:id'
  return response.data;
});

// Define asynchronous thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`http://localhost:4001/api/users/${userId}`); // Assuming your backend endpoint for deleting users is '/api/users/:id'
  return userId;
});

// Create users slice
// Create users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

 

export default usersSlice.reducer;
