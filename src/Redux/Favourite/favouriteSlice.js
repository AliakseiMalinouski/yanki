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
        },
        configureState: (state, action) => {
            state.favourite = action.payload;
        },
        clearState: (state, action) => {
            state.favourite.splice(0, state.favourite.length);
        }
    }
});

export const {addToFavourite, configureState, clearState} = favouriteSlice.actions;
export default favouriteSlice.reducer;