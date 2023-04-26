import React from "react";
import { yankiEvents } from "../events";
import { useState } from "react";

export const OrderForm = React.memo(({setLanguage, typeOfDelivery, payMethods}) => {

    const [infoAboutClient, setInfoAboutClient] = useState({
        client_name: "",
        client_surname: "",
        client_email: "",
        client_phone_number: "",
        type_of_delivery: "",
        address_for_delivery: "",
        post_name: "",
        pay_method: ""
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
            client_phone_number: "",
            type_of_delivery: "",
            address_for_delivery: "",
            post_name: "",
            pay_method: ""
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
                    typeOfDelivery.map(({id, type}) => <div key={id} className="WrapperCheckBox">
                        <input className="TypeOfDelivery" key={id} onChange={handleForm} type="radio" value={type} name="type_of_delivery"/>
                        <span>{setLanguage(`${type}`)}</span>
                    </div>)
                }
            </div>
            <h4 className="TitleAddressToDelivery">{setLanguage("address-for-delivery")}</h4>
            <div className="InfoAboutClientAddress">
                <input type="text" value={infoAboutClient.address_for_delivery} name="address_for_delivery" onChange={handleForm} placeholder={setLanguage("address-for-delivery")}/>
                <input type="text" value={infoAboutClient.post_name} name="post_name" onChange={handleForm} placeholder=""/>
            </div>
            <p className="PayHint">{setLanguage("pay-hint")}</p>
            <div className="PayMethods">
                {
                    payMethods.map(({id, method, image}) => <div className="WrapperCheckBox" key={id}>
                        <input key={id} type="radio" className="PayMethod" name="pay_method" onChange={handleForm} value={method}/>
                        <span>{setLanguage(`${method}`)}</span>
                        {
                            image
                            ?
                            <img src={image ? image : null} alt="Pay method"/>
                            : 
                            null
                        }
                    </div>)
                }
            </div>
            <button className="TakeOrderButton" onClick={takeOrder}>{setLanguage("take-order")}</button>
        </form>
    )
})