import React from "react";

export const CompletedOrder = React.memo(({email, items, name, phone, surname, total, valute, status, dateOptions, delivery, addressForDelivery, postName, payMethod}) => {
    
    return (
        <div className="CompletedOrder">
            {postName}
        </div>
    )
})