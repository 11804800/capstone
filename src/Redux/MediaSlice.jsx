import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videos:[],
    Search:""
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
        }
    },
},);

export default MediaSlice.reducer;
export const {setSearch,ShowVideos}=MediaSlice.actions;