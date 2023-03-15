import React from "react";
import { yankiEvents } from "../events";

export const ClotherTitle = React.memo(({title, setLanguage, currentClother}) => {

    const filteredByClothes = () => {
        yankiEvents.emit("filteredByClothes", title);
    }

    if(currentClother === title) {
        return (
            <div className="ClotherTitle ActiveTitle" onClick={filteredByClothes}>
                <span>{setLanguage(`${title}`)}</span>
            </div>
        )
    }
    else {
        return (
            <div className="ClotherTitle" onClick={filteredByClothes}>
                <span>{setLanguage(`${title}`)}</span>
            </div>
        )
    }
})