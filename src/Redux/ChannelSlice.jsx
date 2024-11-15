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
    AddVideo: (state, action) => {
      const { channelId, videoId } = action.payload;
      const index = state.channels.findIndex((item) => {
        item.name === channelId;
      });
      if (index > 0) {
        state.channels[index]?.videos.push(videoId);
      }
    },
    removeVideo: (state, action) => {
      const { channelId, videoId } = action.payload;
      const index = state.channels.findIndex((item) => {
        item.name === channelId;
      });
      const videoIndex = state.channels[index]?.videos.findIndex(
        (item) => item == videoId
      );
      if (index > 0) {
        state.channels[index].videos.splice(videoIndex, 1);
      }
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
  AddVideo,
  removeVideo,
} = ChannelSlice.actions;
