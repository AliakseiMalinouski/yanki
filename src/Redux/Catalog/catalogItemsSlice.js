import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: {},
    updatedItems: []
}

export const catalogItemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItemsCatalog: (state, action) => {
            state.items = action.payload;
        },
        updateTypeOfItems: (state, action) => {
            state.updatedItems = action.payload;
        }
    }
});

export const {setItemsCatalog, updateTypeOfItems} = catalogItemsSlice.actions;
export default catalogItemsSlice.reducer;