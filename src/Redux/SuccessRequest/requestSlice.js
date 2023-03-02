import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadState: 0,
    userMessage: {}
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        updateRequestBody: (state, action) => {
            state.userMessage = action.payload;
        },
        updateLoadState: (state, action) => {
            state.loadState = action.payload;
        }
    }
});

export const {updateRequestBody, updateLoadState} = requestSlice.actions;
export default requestSlice.reducer;