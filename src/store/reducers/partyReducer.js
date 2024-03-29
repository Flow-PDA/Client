import { createSlice } from "@reduxjs/toolkit";

const initialState = { partyKey: "" };

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    changePartyKey: (state, action) => {
      state.partyKey = action.payload;
    },
    deletePartyKey: (state) => {
      state.partyKey = { partyKey: "null" };
    },
  },
});

export const { changePartyKey, deletePartyKey } = partySlice.actions;
export default partySlice.reducer;
