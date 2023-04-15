import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    displayName: "",
    photoURL: ""
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
        }
    }
});

export const {updateUser} = currentUserSlice.actions;
export default currentUserSlice.reducer;