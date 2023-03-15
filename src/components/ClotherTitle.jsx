import React from "react";

export const ClotherTitle = React.memo(({title, setLanguage}) => {
    return (
        <div className="ClotherTitle">
            <span>{setLanguage(`${title}`)}</span>
        </div>
    )
})