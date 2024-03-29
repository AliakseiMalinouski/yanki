import React, { useMemo } from "react";

export const CompletedOrder = React.memo(({email, items, name, phone, surname, total, valute, status, dateOptions, delivery, addressForDelivery, postName, payMethod, setLng, course, currentValute}) => {
    let itemsMemoizeed = useMemo(() => items.map(({key, image, id, price, color}) => <div key={id} className="ItemInHistory">
        {
            <>
                <img src={image} alt={setLng(`${key}`)}/>
                <span className="NameOfItemInHistory">{setLng(`${key}`)}</span>
                <span className="QuanlityOfItemInHistory">{setLng('quanlity')}: 1</span>
                <span className="ColorOfItemInHistory">{status}</span>
                <span className="PriceOfItemInHistory">
                    {
                        currentValute === 'UAH' ? price : (price.replace(/[^\d-]/g, '') / course).toFixed(0) + `${currentValute}`
                    }
                </span>
            </>
        }
    </div>), [items, setLng, course, currentValute, status])
    
    return (
        <div className="AllInfoAboutOrder">
            <div className="CompletedOrder">
                {itemsMemoizeed}
            </div>
            <div className="DetailsAboutClientsOrder">
                <div className="SelfInfo">
                    <h5>{setLng('name-and-surname')}:  <span>{name} {surname}</span></h5>
                    <p>Email: <span>{email}</span></p>
                    <p>{setLng('phone-number')}: <span>{phone}</span></p>
                    <p>{setLng('date')}: <span>{dateOptions.date}.{dateOptions.month + 1}.{dateOptions.year}</span></p>
                </div>
                <div className="MethodsOfOrder">
                    <h5>{setLng("way-of-delivery")}: <span>{setLng(`post-name`)}</span></h5>
                    <h5>{setLng(`${delivery}`)}</h5>
                    <p><span>{setLng(`${payMethod}`)}</span></p>
                    <p>{setLng("address-for-delivery")}: {addressForDelivery}</p>
                </div>
                <h4 className="TotalInOrder">{currentValute === 'UAH' ? total + " "+  currentValute : (total / course).toFixed(0) + `${currentValute}`}</h4>
            </div>
        </div>
    )
})