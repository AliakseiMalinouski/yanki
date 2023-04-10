import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: []
}

export const typeOfDeliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload;
        }
    }
})

export const {setTypes} = typeOfDeliverySlice.actions;
export default typeOfDeliverySlice.reducer;