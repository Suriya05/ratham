import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../state";

export const store = configureStore({
    reducer: {
        chat: chatReducer
    }
})