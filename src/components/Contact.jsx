import React from "react";

export const Contact = React.memo(({title, contact, type, setLanguage}) => {
    return (
        <div className="Contact">
            {setLanguage(`${title}`)}
        </div>
    )
})