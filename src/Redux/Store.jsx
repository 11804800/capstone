import { configureStore } from "@reduxjs/toolkit";
import MediaSlice from "./MediaSlice";
import UserSlice from "./UserSlice";
import ChannelSlice from "./ChannelSlice";

const Store=configureStore({
    reducer:{
        media:MediaSlice,
        user:UserSlice,
        channel:ChannelSlice
    }
});

export default Store;