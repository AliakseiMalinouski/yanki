import React from "react";

export const EmptyCatalog = React.memo(({setLanguage}) => {
    return (
        <div className="EmptyCatalog">
            {setLanguage("empty-catalog")}
        </div>
    )
})