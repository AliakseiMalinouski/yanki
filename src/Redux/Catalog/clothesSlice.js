import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clothes: []
}

export const clothesSlice = createSlice({
    name: "clothes",
    initialState,
    reducers: {
        setTitlesClothes: (state, action) => {
            state.clothes = action.payload;
        }
    }
})

export const {setTitlesClothes} = clothesSlice.actions;
export default clothesSlice.reducer;