import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: []
}

export const currentCategorySlice = createSlice({
    name: "neededCategory",
    initialState,
    reducers: {
        setCurrentCategory: (state, action) => {
            state.category = action.payload;
        } 
    }
});

export const {setCurrentCategory} = currentCategorySlice.actions;
export default currentCategorySlice.reducer;