import React from "react";
import { yankiEvents } from "../events";

export const ViewItemDetails = React.memo(({image, translateKey, hover, price, sizes, color, addButtonState, item}) => {

    const addToCartStart = () => {
        yankiEvents.emit("addToCart", item);
    }


    return (
        <div className="AllInformationAboutItem">
            {translateKey}
            <br/>
            <button className="AddToCartButton" disabled={addButtonState} onClick={addToCartStart}>Add to cart</button>
        </div>
    )
});