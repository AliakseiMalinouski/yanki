import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { yankiEvents } from "../events";

export const Item = React.memo(({translateKey, image, sizes, price, hoverImage, like}) => {

    const {t} = useTranslation();

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
                    sizes.map(elem => <li className="ItemsSize" key={Math.random()}>{elem}</li>)
                }
            </ul>
        </div>
    )
})