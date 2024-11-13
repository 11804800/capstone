import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token"))
    : "",
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "",
  userData: null,
  err: "",
  loading: false,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: initialState,
  reducers: {
    Logout: (state) => {
      state.token = "";
      state.user = "";
      state.userData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    Login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    ShowUserData: (state, action) => {
      state.userData = action.payload;
    },
    Subscribe: (state, action) => {
      state.userData.subscribed.push(action.payload);
    },
    UnSubscribe: (state, action) => {
      const index = state.userData.channels.findIndex(
        (item) => item === action.payload
      );
      state.userData.subscribed.splice(index, 1);
    },
    SetUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetUserError: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export default UserSlice.reducer;
export const {
  Logout,
  Login,
  ShowUserData,
  Subscribe,
  UnSubscribe,
  SetError,
  SetLoading,
} = UserSlice.actions;
