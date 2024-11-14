import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  channels: [],
  err: "",
  loading: false,
};

const ChannelSlice = createSlice({
  name: "ChannelSlice",
  initialState: initialState,
  reducers: {
    ShowChannels: (state, action) => {
      state.channels = action.payload;
    },
    AddNewChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    SetChannelLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetChannelError: (state, action) => {
      state.err = action.payload;
    },
    removeChannel: (state, action) => {
      const index = state.channels.findIndex(
        (item) => item.name == action.payload
      );
      state.channels.splice(index, 1);
    },
    UpdateChannel: (state, action) => {
      const index = state.channels.findIndex((item) => {
        item.name === action.payload?.name;
      });
      state.channels[index] = action.payload;
    },
  },
});

export default ChannelSlice.reducer;
export const {
  ShowChannels,
  SetChannelError,
  SetChannelLoading,
  removeChannel,
  AddNewChannel,
  UpdateChannel,
} = ChannelSlice.actions;
