import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    icons: []
}

export const iconsSlice = createSlice({
    name: "icons",
    initialState,
    reducers: {
        setIcons: (state, action) => {
            state.icons = action.payload;
        }
    }
});

export const {setIcons} = iconsSlice.actions;
export default iconsSlice.reducer;