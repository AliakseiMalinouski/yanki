import React from "react";

export const EmptyBacket = React.memo(({setLanguage}) => {
    return (
        <div className="EmptyBacket">
            {setLanguage('empty-backet')}
        </div>
    )
})