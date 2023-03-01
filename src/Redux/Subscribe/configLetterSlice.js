import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    config: {}
}

export const configLetterSlice = createSlice({
    name: "letterConfig",
    initialState,
    reducers: {
        saveDataLetter: (state, action) => {
            state.config = action.payload;
        }
    }
});

export const {saveDataLetter} = configLetterSlice.actions;
export default configLetterSlice.reducer;