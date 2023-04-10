import React from "react";
import { yankiEvents } from "../events";
import { useState } from "react";

export const OrderForm = React.memo(({setLanguage, typeOfDelivery}) => {

    const [infoAboutClient, setInfoAboutClient] = useState({
        client_name: "",
        client_surname: "",
        client_email: "",
        client_phone_number: ""
    })

    const handleForm = (eo) => {
        setInfoAboutClient({...infoAboutClient, [eo.target.name]: eo.target.value});
    }

    const takeOrder = () => {
        yankiEvents.emit('takeOrder', infoAboutClient);
        setInfoAboutClient({
            client_name: "",
            client_surname: "",
            client_email: "",
            client_phone_number: ""
        });
    }

    return (
        <form action="#" method="#" className="FormOfOrder" onSubmit={(eo) => {eo.preventDefault()}} name="orderForm">
            <input type="text" value={infoAboutClient.client_name} placeholder={setLanguage('placeholder-name')} name="client_name" onChange={handleForm}/>
            <input type="text" value={infoAboutClient.client_surname} placeholder={setLanguage('placeholder-surname')} name="client_surname" onChange={handleForm}/>
            <input type="text" value={infoAboutClient.client_email} placeholder={setLanguage('placeholder-email')} name="client_email" onChange={handleForm}/>
            <input type="number" value={infoAboutClient.client_phone_number} placeholder={setLanguage('placeholder-phone-number')} name="client_phone_number" onChange={handleForm}/>
            <div className="TypesOfDelivery">
                {
                    typeOfDelivery.map(({id, type}) => <div className="WrapperCheckBox">
                        <input className="TypeOfDelivery" key={id} type="radio"/>
                        <span>{setLanguage(`${type}`)}</span>
                    </div>)
                }
            </div>
            <button onClick={takeOrder}>Take order</button>
        </form>
    )
})