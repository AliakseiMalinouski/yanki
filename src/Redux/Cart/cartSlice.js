import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let flag = false;
            state.items.forEach(elem => {
                if(elem.key === action.payload.key) flag = true;
            });
            if(!flag) state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            let newArr = state.items.filter(elem => {
                return elem.key !== action.payload.key;
            });
            state.items = newArr;
        },
        configureCartState: (state, action) => {
            state.items = action.payload;
        },
        clearAllCart: (state, action) => {
            state.items.splice(0, state.items.length);
        }
    }
});

export const {addToCart,removeFromCart,configureCartState, clearAllCart} = cartSlice.actions;
export default cartSlice.reducer;