import React from "react";
import {yankiEvents} from '../events';
import { useTranslation } from "react-i18next";

export const Category = React.memo(({translateKey, link, image, id}) => {

    const {t} = useTranslation();

    const styles = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    const parentCalledToGoToDetailsCategory = () => {
        yankiEvents.emit('goToDetailsCategory', translateKey);
    }

    return (
        <div className="Category" style={styles} onClick={parentCalledToGoToDetailsCategory}>
            <div className="CategoryName">
                {t(`${translateKey}`)}
            </div>
        </div>
    )
})