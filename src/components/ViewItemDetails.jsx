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
                <><img src={color && color.src} alt={color && color.alt}/></>
                <button className="AddToCartButton" disabled={addButtonState} onClick={addToCartStart}>Add to cart</button>
            </div>
        </div>
    )
});