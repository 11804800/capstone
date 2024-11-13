import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videos:[],
    filters:[],
    err:"",
    loading:false
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
        },
        SetLoading:(state,action)=>{
            state.loading=action.payload
        },
        SetError:(state,action)=>{
            state.loading=action.payload
        },
        PushComment:(state,action)=>{
            //finding index
            const index=state.videos.findIndex((item)=>item?._id==action.payload?.videoId);
            // pushing it in front
            state.videos[index]?.comments?.push(action.payload.comments);
        },
        EditComments:(state,action)=>{
            const index=state.videos.findIndex((item)=>item?._id==action.payload?.videoId);
            const commentIndex=state.videos[index]?.comments.findIndex((item)=>item?._id==action.payload?.comments?._id);
            state.videos[index].comments[commentIndex]=action.payload.comments;
        },
        RemoveComment:(state,action)=>{
            const index=state.videos.findIndex((item)=>item?._id==action.payload?.videoId);
            const commentIndex=state.videos[index]?.comments.findIndex((item)=>item?._id==action.payload?.commentId);
            state.videos[index].comments.splice(commentIndex,1);
        }
    },
},);

export default MediaSlice.reducer;
export const {setSearch,ShowVideos,ShowFilters,EditVideo,SetError,SetLoading,PushComment,EditComments,RemoveComment}=MediaSlice.actions;