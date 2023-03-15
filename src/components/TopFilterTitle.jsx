import React from "react";

export const TopFilterTitle = React.memo(({title, setLanguage}) => {
    return (
        <div className="TopFilterTitle">
            {setLanguage(`${title}`)}
        </div>
    )
})