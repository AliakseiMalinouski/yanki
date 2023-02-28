import React from "react";
import {yankiEvents} from '../events';

export const Category = React.memo(({translateKey, link, image, id}) => {

    const parentCalledToGoToDetailsCategory = () => {
        yankiEvents.emit('goToDetailsCategory', translateKey);
    }

    return (
        <div onClick={parentCalledToGoToDetailsCategory}>
            {translateKey}
        </div>
    )
})