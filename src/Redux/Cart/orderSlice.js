import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    infoAboutClient: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        items: [],
        valute: "",
        total: ""
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
            state.infoAboutClient.total = action.payload.total;
            state.infoAboutClient.valute = action.payload.valute;
            state.infoAboutClient.items = action.payload.items;
        },
        updateItemsOfOrder: (state, action) => {
            state.infoAboutClient.items = action.payload;
        }
    }
});

export const {setInfoAboutClient, updateItemsOfOrder} = orderSlice.actions;
export default orderSlice.reducer;