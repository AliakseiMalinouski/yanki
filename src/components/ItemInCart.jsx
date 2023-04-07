import React from "react";
import { useEffect, useState } from "react";
import { createImageElement } from "../helpers/createImageElement";
import {yankiEvents} from '../events';

export const ItemInCart = React.memo(({price, image, type, translateKey, sizes, color, hover, like, setLanguage, colorOptions, sizesState, item, currentValute, course}) => {

    const [imageElement, setImageElement] = useState(null);

    useEffect(() => {
        let imageElement = createImageElement(color, colorOptions, 'ImageOfColor');
        setImageElement(imageElement);
    }, [color, colorOptions]);

    const changeSizesState = () => {
        yankiEvents.emit('changeSizesState', translateKey);
    }

    const deleteItemFromCart = () => {
        yankiEvents.emit('deleteItemFromCart', item);
    }

    return (
        <div className="ItemInCart">
            <img className="ItemImage" src={image} alt={setLanguage(`${translateKey}`)} />
            <h4>{setLanguage(`${translateKey}`)}</h4>
            {imageElement}
            <ul onClick={changeSizesState} className={sizesState === translateKey ? 'ActiveSizesList' : 'StaticSizesList'}>
                {
                    sizes.filter((elem) => {
                        if(sizesState !== translateKey) return elem === 'L';
                        else return elem;
                    }).map(size => <li key={Math.random()}>{sizesState !== translateKey ? <>
                    <span>{size}</span>
                    <img className="ArrowItemCart" src='https://i.ibb.co/jLth7Hr/Vector-9.png' alt="Arrow"/>
                    </> : 
                    size
                    }</li>)
                }
            </ul>
            <img className="DeleteItemButton" onClick={deleteItemFromCart} src="https://i.ibb.co/2Z56pzw/Vector-10.png" alt="Delete"/>
            <div className="PriceItemCart">
                {currentValute !== 'UAH' ? (price.replace(/[^\d-]/g, '') / course).toFixed(0) + ` ${currentValute}` : price}
            </div>
        </div>
    )
})