import React from "react";

export const HintCurrentPage = React.memo(({mainPage, t, currentPage}) => {
    return (
        <p className="Navigation">
            <span>{t(`${mainPage}`)}</span> 
            <img className="ArrowCartTitle" src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/> 
            <span>{t(`${currentPage}`)}</span>
        </p>
    )
})