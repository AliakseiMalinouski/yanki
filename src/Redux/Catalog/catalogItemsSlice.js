import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: {}
}

export const catalogItemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItemsCatalog: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const {setItemsCatalog} = catalogItemsSlice.actions;
export default catalogItemsSlice.reducer;