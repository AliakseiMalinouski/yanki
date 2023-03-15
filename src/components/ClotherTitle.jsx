import React from "react";

export const ClotherTitle = React.memo(({title}) => {
    return (
        <div className="ClotherTitle">
            {title}
        </div>
    )
})