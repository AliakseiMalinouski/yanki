import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    valuteArray: [],
    currentValute: 'UAH',
    all: {},
    course: null
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
            let allCurrencies = action.payload.conversion_rates;
            for(let currency in allCurrencies) {
                if(currency === state.currentValute) {
                    state.course = allCurrencies['UAH'];
                }
            }
        }
    }
});

export const {loadValute, changeValute, updateValute} = valuteSlice.actions;
export default valuteSlice.reducer;