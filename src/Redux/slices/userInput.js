import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: "Hello",
  status: 'idle',
  error: null,
};

const userInputSlice = createSlice({
  name: 'userInput123',
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});

export const { addInput } = userInputSlice.actions;

export default userInputSlice.reducer;
