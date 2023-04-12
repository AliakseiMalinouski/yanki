import React from "react";
import { yankiEvents } from "../events";

export const ItemInFav = React.memo(({hover, image, name, setLng}) => {
    const goToDetails = () => {
        yankiEvents.emit('goToDetails', name);
    }
    return (
        <div onClick={goToDetails} className="ItemInFav" style={{backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 80%',
        transition: 'background-image 0.7s ease-in-out 0s',}}>
            <h3>{setLng(`${name}`)}</h3>
        </div>
    )
})