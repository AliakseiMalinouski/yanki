import React from "react";
import { yankiEvents } from "../events";

export const ClearCartButton = React.memo(() => {

    const clearCart = () => {
        yankiEvents.emit('clearCart', true);
    }

    return (
        <button onClick={clearCart}>clear cart</button>
    )
})