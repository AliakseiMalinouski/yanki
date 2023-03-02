import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: {}
}

export const footerContentSlice = createSlice({
    name: "footerContent",
    initialState,
    reducers: {
        setContentFooter: (state, action) => {
            state.content = action.payload;
        }
    }
});

export const {setContentFooter} = footerContentSlice.actions;
export default footerContentSlice.reducer;