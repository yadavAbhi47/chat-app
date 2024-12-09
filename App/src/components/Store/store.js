import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./slices/ChatSlice";

export const store=configureStore({
    reducer:{
       
        chatReducer,
        // TODO:
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
    
})