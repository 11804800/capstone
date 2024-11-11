import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  channels: [],
};

const ChannelSlice = createSlice({
  name: "ChannelSlice",
  initialState: initialState,
  reducers: {
    ShowChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export default ChannelSlice.reducer;
export const { ShowChannels } = ChannelSlice.actions;
