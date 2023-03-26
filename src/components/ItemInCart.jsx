import React from "react";

export const ItemInCart = React.memo(({price, image, type, translateKey, sizes, color, hover, like, setLanguage, colorOptions}) => {

    

    return (
        <div className="ItemInCart">
            <img src={image} alt={setLanguage(`${translateKey}`)} />
            <div className="ItemCartColor">

            </div>
            {setLanguage(`${translateKey}`)}
        </div>
    )
})