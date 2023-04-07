import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    infoAboutClient: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        items: []
    }
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setInfoAboutClient: (state, action) => {
            state.infoAboutClient.name = action.payload.name;
            state.infoAboutClient.surname = action.payload.surname;
            state.infoAboutClient.email = action.payload.email;
            state.infoAboutClient.phone = action.payload.phone;
        }
    }
});

export const {setInfoAboutClient} = orderSlice.actions;
export default orderSlice.reducer;