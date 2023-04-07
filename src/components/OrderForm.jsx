import React from "react";

export const OrderForm = React.memo(({setLanguage}) => {

    

    return (
        <form action="#" method="#">
            <input type="text" placeholder={setLanguage('placeholder-name')}/>
            <input type="text" placeholder={setLanguage('placeholder-surname')}/>
            <input type="text" placeholder={setLanguage('placeholder-email')}/>
            <input type="text" placeholder={setLanguage('placeholder-phone-number')}/>
        </form>
    )
})