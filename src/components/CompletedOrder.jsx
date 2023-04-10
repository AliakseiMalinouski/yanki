import React from "react";

export const CompletedOrder = React.memo(({email, items, name, phone, surname, total, valute, status}) => {
    return (
        <div className="CompletedOrder">
            {name}
        </div>
    )
})