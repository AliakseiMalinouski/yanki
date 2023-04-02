import React from "react";
import { yankiEvents } from "../events";

export const ValuteSelect = React.memo(({id, valute}) => {

    const selectValute = () => {
        yankiEvents.emit('selectValute', valute);
    }

    return (
        <li onClick={selectValute}>{valute}</li>
    )
})