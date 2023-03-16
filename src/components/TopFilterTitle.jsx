import React from "react";
import { yankiEvents } from "../events";

export const TopFilterTitle = React.memo(({title, setLanguage, topFilterState, filter}) => {

    const changeTopFilterState = () => {
        yankiEvents.emit("changeTopFilterState", title);
    }

    const selectTypeOfFilterToSize = (eo) => {
        let textOfTargetElement = eo.target.innerText;
        yankiEvents.emit("selectTopFilterType", {type: "size", text: textOfTargetElement});
    }

    const selectTypeOfFilterToColor = (eo) => {
        let altAttributeOfTargetElement = eo.target.alt;
        yankiEvents.emit("selectTopFilterType", {type: "color", text: altAttributeOfTargetElement});
    }

    const selectTypeOfFilterToPrice = (eo) => {
        let textOfTargetElement = eo.target.innerText;
        yankiEvents.emit("selectTopFilterType", {type: "price", text: textOfTargetElement});
    }

    const resetAll = () => {
        yankiEvents.emit("resetAllFilters", true);
    }

    if(topFilterState === title) {
        return (
            <div className="TopFilterTitle" onClick={changeTopFilterState}>
                <span className="ColoredSpan">{setLanguage(`${title}`)}</span> <img className="RotateArrow" src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
                <ul className="FilterVariants">
                    {
                        filter.map(elem => topFilterState === 'color' 
                        ? 
                        <li onClick={selectTypeOfFilterToColor} key={elem.id}><img src={elem.image} alt={elem.alt}/></li>
                        : 
                        <li onClick={elem === "XXS" || elem === "XS" || elem === "S" || elem === 'M' || elem === "L" ? selectTypeOfFilterToSize : selectTypeOfFilterToPrice} key={Math.random()}>{elem}</li>)
                    }
                </ul>
            </div>
        )
    }
    else {
        return (
            <div className="TopFilterTitle" onClick={title === "reset" ? resetAll : changeTopFilterState}>
                {
                    title === "reset"
                    ?
                    <span className="ResetAllFiltersButton">{setLanguage(`${title}`)}</span>
                    :
                    <>
                        <span>{setLanguage(`${title}`)}</span> <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
                    </>
                }
            </div>
        )
    }
})