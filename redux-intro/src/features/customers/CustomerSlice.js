import { createSlice } from "@reduxjs/toolkit";

const customerInitState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitState,
  reducers: {
    create: {
      reducer: (state, action) => {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
      prepare: (fullName, nationalId) => {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    update: (state, action) => {
      state.fullName = action.payload.fullName;
    },
  },
});

export const { create, update } = customerSlice.actions;
export default customerSlice.reducer;
