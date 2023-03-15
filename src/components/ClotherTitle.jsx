import React from "react";
import { yankiEvents } from "../events";

export const ClotherTitle = React.memo(({title, setLanguage}) => {

    const filteredByClothes = () => {
        yankiEvents.emit("filteredByClothes", title);
    }

    return (
        <div className="ClotherTitle" onClick={filteredByClothes}>
            <span>{setLanguage(`${title}`)}</span>
        </div>
    )
})