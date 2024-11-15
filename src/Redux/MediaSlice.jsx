import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  filters: [],
  err: "",
  loading: false,
  history: JSON.parse(localStorage.getItem("history"))
    ? JSON.parse(localStorage.getItem("history"))
    : [],
};

const MediaSlice = createSlice({
  name: "MediaSlice",
  initialState: initialState,
  reducers: {
    setSearch: (state, action) => {
      state.Search = action.payload;
    },
    ShowVideos: (state, action) => {
      state.videos = action.payload;
    },
    ShowFilters: (state, action) => {
      state.filters = action.payload;
    },
    PushVideo:(state,action)=>{
      state.videos.push(action.payload);
    },
    EditVideo: (state, action) => {
      const index = state.videos.findIndex(
        (item) => item._id == action.payload._id
      );
      state.videos[index] = action.payload;
    },
    SetVideoLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetVideoError: (state, action) => {
      state.err = action.payload;
    },
    PushComment: (state, action) => {
      //finding index
      const index = state.videos.findIndex(
        (item) => item?._id == action.payload?.videoId
      );
      // pushing it in front
      state.videos[index]?.comments?.push(action.payload.comments);
    },
    EditComments: (state, action) => {
      const index = state.videos.findIndex(
        (item) => item?._id == action.payload?.videoId
      );
      const commentIndex = state.videos[index]?.comments.findIndex(
        (item) => item?._id == action.payload?.comments?._id
      );
      state.videos[index].comments[commentIndex] = action.payload.comments;
    },
    RemoveComment: (state, action) => {
      const index = state.videos.findIndex(
        (item) => item?._id == action.payload?.videoId
      );
      const commentIndex = state.videos[index]?.comments.findIndex(
        (item) => item?._id == action.payload?.commentId
      );
      state.videos[index].comments.splice(commentIndex, 1);
    },
    setHistory: (state, action) => {
      const index = state.history.findIndex((item) => item == action.payload);
      if (index<0) {
        state.history.push(action.payload);
        localStorage.setItem("history", JSON.stringify(state.history));
      }
    },
    PopVideo:(state,action)=>{
      const index=state.videos.findIndex((item)=>item.title==action.payload);
      state.videos.splice(index,1);
    }
  },
});

export default MediaSlice.reducer;
export const {
  setSearch,
  ShowVideos,
  ShowFilters,
  EditVideo,
  SetVideoError,
  SetVideoLoading,
  PushComment,
  EditComments,
  RemoveComment,
  setHistory,
  PushVideo,
  PopVideo
} = MediaSlice.actions;
