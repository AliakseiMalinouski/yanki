import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourite: []
}

export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFavourite: (state, action) => {
            let flag = false;
            state.favourite.forEach(elem => {
                if(elem.key === action.payload.key) flag = true;
            });
            if(!flag) state.favourite.push(action.payload);
        }
    }
});

export const {addToFavourite} = favouriteSlice.actions;
export default favouriteSlice.reducer;