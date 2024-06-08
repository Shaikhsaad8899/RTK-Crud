import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import userReducer from './slices/usernameSlice';
import userinputReducer from './slices/userInput';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    userinputs: userinputReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
