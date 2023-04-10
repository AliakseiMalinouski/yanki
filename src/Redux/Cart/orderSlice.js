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
    },
    allOrders: []
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
        setAllOrders: (state, action) => {
            state.allOrders = action.payload;
        }
    }
});

export const {setInfoAboutClient, setAllOrders} = orderSlice.actions;
export default orderSlice.reducer;