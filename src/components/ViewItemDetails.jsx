import React from "react";
import { yankiEvents } from "../events";

export const ViewItemDetails = React.memo(({image, translateKey, hover, price, sizes, color, addButtonState, item}) => {

    const addToCartStart = () => {
        yankiEvents.emit("addToCart", item);
    }


    return (
        <div className="AllInformationAboutItem">
            <img src={image} alt='Item'/>
            <div className="MoreAboutItem">
                <h3>{translateKey}</h3>
                <h5>{price}</h5>
                <h5>{color}</h5>
                <button className="AddToCartButton" disabled={addButtonState} onClick={addToCartStart}>Add to cart</button>
            </div>
            <br/>
        </div>
    )
});