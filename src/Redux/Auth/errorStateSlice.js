import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorState: {}
}

export const errorStateSlice = createSlice({
    name: "errorState",
    initialState,
    reducers: {
        updateErrorState: (state, action) => {
            state.errorState = action.payload;
        }
    }
});

export const {updateErrorState} = errorStateSlice.actions;
export default errorStateSlice.reducer;