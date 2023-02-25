import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navLinks: []
}

export const navLinkSlice = createSlice({
    name: "navLinks",
    initialState,
    reducers: {
        setNavLinks: (state, action) => {
            state.navLinks = action.payload;
        }
    }
});

export const {setNavLinks} = navLinkSlice.actions;
export default navLinkSlice.reducer;