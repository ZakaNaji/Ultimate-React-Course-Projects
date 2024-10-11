import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update(state, action) {
      state.username = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { update } = userSlice.actions;
