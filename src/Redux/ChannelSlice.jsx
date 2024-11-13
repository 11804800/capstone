import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  channels: [],
  err:"",
  loading:false
};

const ChannelSlice = createSlice({
  name: "ChannelSlice",
  initialState: initialState,
  reducers: {
    ShowChannels: (state, action) => {
      state.channels = action.payload;
    },
    SetChannelLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetChannelError: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default ChannelSlice.reducer;
export const { ShowChannels,SetChannelError,SetChannelLoading } = ChannelSlice.actions;
