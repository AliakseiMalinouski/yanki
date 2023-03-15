import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemDetails: {
        name: "",
        key: "",
        allInformation: {}
    }
}

export const itemDetailSlice = createSlice({
    name: "itemDetails",
    initialState,
    reducers: {
        setDataAboutItem: (state, action) => {
            state.itemDetails.name = action.payload.name;
            state.itemDetails.key = action.payload.key;
        },
        setAllInformation: (state, action) => {
            state.itemDetails.allInformation = action.payload;
        }
    }
});

export const {setDataAboutItem, setAllInformation} = itemDetailSlice.actions;
export default itemDetailSlice.reducer;