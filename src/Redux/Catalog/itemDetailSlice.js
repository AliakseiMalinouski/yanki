import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemDetails: {
        name: "",
        key: ""
    }
}

export const itemDetailSlice = createSlice({
    name: "itemDetails",
    initialState,
    reducers: {
        setDataAboutItem: (state, action) => {
            state.itemDetails.name = action.payload.name;
            state.itemDetails.key = action.payload.key;
        }
    }
});

export const {setDataAboutItem} = itemDetailSlice.actions;
export default itemDetailSlice.reducer;