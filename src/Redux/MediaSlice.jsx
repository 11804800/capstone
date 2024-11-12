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
        }
    },
},);

export default MediaSlice.reducer;
export const {setSearch,ShowVideos,ShowFilters}=MediaSlice.actions;