import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {},
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export default authSlice.reducer;
