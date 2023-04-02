import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    valuteArray: [],
    currentValute: 'uah'
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
        }
    }
});

export const {loadValute, changeValute} = valuteSlice.actions;
export default valuteSlice.reducer;