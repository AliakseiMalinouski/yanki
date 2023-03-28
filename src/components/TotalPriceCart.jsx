import React from "react";

export const TotalPriceCart = React.memo(({total, setLanguage}) => {
    return (
        <div className="Total">
            {setLanguage("payable")}: <span>{total}</span>
        </div>
    )
})