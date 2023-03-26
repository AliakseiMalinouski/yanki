import React from "react";
import { useEffect } from "react";
import { createImageElement } from "../helpers/createImageElement";

export const ItemInCart = React.memo(({price, image, type, translateKey, sizes, color, hover, like, setLanguage, colorOptions}) => {


    useEffect(() => {
        console.log(createImageElement(color, colorOptions))
    }, [color, colorOptions]);
    

    return (
        <div className="ItemInCart">
            <img src={image} alt={setLanguage(`${translateKey}`)} />
            <div className="ItemCartColor">
                
            </div>
            {setLanguage(`${translateKey}`)}
        </div>
    )
})