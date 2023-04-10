import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    methods: []
}

export const payMethodsSlice = createSlice({
    name: 'payMethods',
    initialState,
    reducers: {
        setPayMethods: (state, action) => {
            state.methods = action.payload;
        }
    }
})

export const {setPayMethods} = payMethodsSlice.actions;
export default payMethodsSlice.reducer;