import React from "react";

export const TopFilterTitle = React.memo(({title, setLanguage}) => {
    return (
        <div className="TopFilterTitle">
            <span>{setLanguage(`${title}`)}</span> <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
        </div>
    )
})