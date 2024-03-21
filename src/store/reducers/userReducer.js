import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../lib/apis/userApi";
import { updateToken } from "../../lib/apis/base";

const initialState = {
  loginReqState: "",
  userInfo: {},
  groupInfo: [],
};

const fetchUserLogin = createAsyncThunk(
  "user/fetchUserSignup",
  async (data, thunkAPI) => {
    // console.log(data);
    const resp = await login(data.email, data.password);
    return resp;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loginReqState = "fulfilled";
      if (action.payload.status == 200) {
        state.userInfo = action.payload.data.result;
        updateToken(state.userInfo.accessToken);
      }
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchUserLogin.pending, (state, action) => {
      state.loginReqState = "pending";
    });
  },
});

export { fetchUserLogin };
export default userSlice.reducer;