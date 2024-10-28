import { configureStore } from "@reduxjs/toolkit";
import MediaSlice from "./MediaSlice";
import UserSlice from "./UserSlice";

const Store=configureStore({
    reducer:{
        media:MediaSlice,
        user:UserSlice
    }
});

export default Store;