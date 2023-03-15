import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topFilterTitles: []
}

export const topFilterSlice = createSlice({
    name: "topFilter",
    initialState,
    reducers: {
        setTopTitles: (state, action) => {
            state.topFilterTitles = action.payload;
        }
    }
})

export const {setTopTitles} = topFilterSlice.actions;
export default topFilterSlice.reducer;