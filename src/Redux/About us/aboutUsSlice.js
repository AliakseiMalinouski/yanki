import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: {}
}

export const aboutUsSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        loadInfoAboutUs: (state, action) => {
            state.info = action.payload;
        }
    }
});

export const {loadInfoAboutUs} = aboutUsSlice.actions;
export default aboutUsSlice.reducer;