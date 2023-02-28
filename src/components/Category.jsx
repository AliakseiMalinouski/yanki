import React from "react";
import {yankiEvents} from '../events';
import { useTranslation } from "react-i18next";

export const Category = React.memo(({translateKey, link, image, id}) => {

    const {t} = useTranslation();

    const parentCalledToGoToDetailsCategory = () => {
        yankiEvents.emit('goToDetailsCategory', translateKey);
    }

    return (
        <div onClick={parentCalledToGoToDetailsCategory}>
            {t(`${translateKey}`)}
        </div>
    )
})