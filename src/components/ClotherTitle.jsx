import React from "react";

export const ClotherTitle = React.memo(({title, setLanguage}) => {
    return (
        <div className="ClotherTitle">
            {setLanguage(`${title}`)}
        </div>
    )
})