import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    colorArray: []
}

export const gridItemSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        loadColors: (state, action) => {
            state.colorArray = action.payload
        }
    }
});

export const {loadColors} = gridItemSlice.actions;
export default gridItemSlice.reducer;