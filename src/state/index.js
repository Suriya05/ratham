import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: {
        initialConversation: [
            {
                user: "bot",
                message: "Hello, Welcome to student info system!",
            },
        ],
        nameConversation: [
            {
                user: "bot",
                message: "Enter your Name",
            },
        ],
        ageConversation: [
            {
                user: "bot",
                message: "Enter your Age",
            },
        ],
    },
    userDetails: {
        name: "",
        age: ""
    },
    isChatActive: false,
    isNameSet: false,
    isAgeSet: false,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        startConversation: (state, action) => {
            const message = action.payload.message;
            const conversation = {
                user: "person",
                message,
            };
            state.isChatActive = true;
            state.chat.initialConversation.push(conversation);
        },
        nameConversation: (state, action) => {
            const message = action.payload.message;
            const conversation = {
                user: "person",
                message,
            };
            state.isNameSet = true;
            state.userDetails.name = message;
            state.chat.nameConversation.push(conversation);
        },
        ageConversation: (state, action) => {
            const message = action.payload.message;
            const conversation = {
                user: "person",
                message,
            };
            state.isAgeSet = true;
            state.userDetails.age = message;
            state.chat.ageConversation.push(conversation);
        }
    },
});

export const { startConversation, nameConversation, ageConversation } = chatSlice.actions;
export default chatSlice.reducer;