import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    valuteArray: [],
    currentValute: 'uah',
    all: {}
}

export const valuteSlice = createSlice({
    name: 'valute',
    initialState,
    reducers: {
        loadValute: (state, action) => {
            state.valuteArray = action.payload;
        },
        changeValute: (state, action) => {
            state.currentValute = action.payload;
        },
        updateValute: (state, action) => {
            state.all = action.payload;
        }
    }
});

export const {loadValute, changeValute, updateValute} = valuteSlice.actions;
export default valuteSlice.reducer;