import React from "react";

export const TotalPriceCart = React.memo(({total, setLanguage, course, currentValute}) => {
    return (
        <div className="Total">
            {setLanguage("payable")}: <span>{course === null ? total + ` ${currentValute}` : (total / course).toFixed(0) + ` ${currentValute}`}</span>
        </div>
    )
})