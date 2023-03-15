import React from "react";
import { yankiEvents } from "../events";

export const TopFilterTitle = React.memo(({title, setLanguage, topFilterState}) => {

    const changeTopFilterState = (eo) => {
        yankiEvents.emit("changeTopFilterState", title);
    }

    if(topFilterState === title) {
        return (
            <div className="TopFilterTitle">
                <span style={{color: "red"}}>{setLanguage(`${title}`)}</span> <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
            </div>
        )
    }
    else {
        return (
            <div className="TopFilterTitle">
                <span onClick={changeTopFilterState}>{setLanguage(`${title}`)}</span> <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
            </div>
        )
    }
})