import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { yankiEvents } from "../events";
import {useLocation} from 'react-router-dom';

export const Item = React.memo(({translateKey, image, sizes, price, hoverImage, like, item}) => {

    const {t} = useTranslation();

    let location = useLocation();

    const [currentImage, setCurrentImage] = useState(image);

    useEffect(() => {
        setCurrentImage(image)
    }, [image]);

    const changeItemImage = () => {
        setCurrentImage(hoverImage);
    }

    const setStaticBackground = () => {
        setCurrentImage(image);
    }

    const goToDetails = () => {
        yankiEvents.emit('goToDetailsItem', translateKey);
    }

    const addToFavourite = (eo) => {
        yankiEvents.emit("addToFav", item);
        eo.stopPropagation();
    }


    return (
        <div className="Item" onMouseEnter={changeItemImage} onClick={goToDetails} onMouseLeave={setStaticBackground} style={{
            backgroundImage: `url(${currentImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 80%',
            transition: 'background-image 0.7s ease-in-out 0s'}}>
            <div style={{height: '360px', width: "100%"}}></div>
            <span className="ItemsName">{t(`${translateKey}`)} <span className="New">{t("new")}</span></span>
            <span className="ItemsPrice">{price}</span>
            <ul className="Sizes">
                {
                    sizes && sizes.map(elem => <li className="ItemsSize" key={Math.random()}>{elem}</li>)
                }
            </ul>
            {location.pathname === '/catalog' ? <img onClick={addToFavourite} className="LikeImage" src={like} alt='Like'/> : null}
        </div>
    )
})