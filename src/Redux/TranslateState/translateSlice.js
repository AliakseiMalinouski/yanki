import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: "en"
}

export const translateSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const {updateLanguage} = translateSlice.actions;
export default translateSlice.reducer;