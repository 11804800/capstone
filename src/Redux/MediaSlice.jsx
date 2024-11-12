import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videos:[],
    filters:[]
}

const MediaSlice=createSlice({
    name:"MediaSlice",
    initialState:initialState,
    reducers:{
        setSearch:(state,action)=>{
            state.Search=action.payload
        },
        ShowVideos:(state,action)=>{
            state.videos=action.payload
        },
        ShowFilters:(state,action)=>{
            state.filters=action.payload
        },
        EditVideo:(state,action)=>{
            const index=state.videos.findIndex((item)=>item._id==action.payload._id);
            state.videos[index]=action.payload;
        }
    },
},);

export default MediaSlice.reducer;
export const {setSearch,ShowVideos,ShowFilters,EditVideo}=MediaSlice.actions;