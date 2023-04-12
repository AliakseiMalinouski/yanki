import React from "react";
import { yankiEvents } from "../events";

export const ViewItemDetails = React.memo(({image, translateKey, hover, price, sizes, color, addButtonState, item, t}) => { 

    const addToCartStart = () => {
        yankiEvents.emit("addToCart", item);
    }

    return (
        <div className="AllInformationAboutItem">
            <img src={image} alt='Item'/>
            <div className="MoreAboutItem">
                <h3>{translateKey}</h3>
                <h5>{price}</h5>
                <div className="ColorAndImage">
                <span>{t("current-color-item-view")}</span>
                <img className="CurrentColorImage" src={color && color.src} alt={color && color.alt}/>
                </div>
                <button className="AddToCartButton" disabled={addButtonState} style={{opacity: addButtonState ? '0.5' : '1'}} onClick={addToCartStart}>{t('add-to-cart-text')}</button>
            </div>
        </div>
    )
});