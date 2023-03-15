import React from "react";

export const TopFilterTitle = React.memo(({title}) => {
    return (
        <div className="TopFilterTitle">
            {title}
        </div>
    )
})