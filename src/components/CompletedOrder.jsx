import React from "react";

export const CompletedOrder = React.memo(({email, items, name, phone, surname, total, valute, status, dateOptions}) => {
    
    return (
        <div className="CompletedOrder">
            {dateOptions.year}
        </div>
    )
})