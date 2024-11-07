import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token") ) :"",
    user:JSON.parse(localStorage.getItem("user")) ?JSON.parse( localStorage.getItem("user")) :""
}

const UserSlice=createSlice({
    name:"UserSlice",
    initialState:initialState,
    reducers:{
    },
},);

export default UserSlice.reducer;