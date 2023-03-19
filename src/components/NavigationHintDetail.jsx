import React from "react";

export const NavigationHintDetail = React.memo(({translateKey, type, ctl}) => {
    return (
        <div className="NavigationHint">
            <span>{ctl}</span>
            <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
            <span>{type}</span>
            <img src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/>
            <span className="ItemName">{translateKey}</span>
        </div>
    )
})