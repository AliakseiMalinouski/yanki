import React, { useCallback, useMemo } from "react";
import { OrderForm } from "./OrderForm";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";
import { TotalPriceCart } from "./TotalPriceCart";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInfoAboutClient } from "../Redux/Cart/orderSlice";

export const Order = React.memo(({course, currentValute, total}) => {

    const {t} = useTranslation();
    let dispatch = useDispatch();

    let orderFormMemoizeed = useMemo(() => <OrderForm setLanguage={t}/>, [t]);

    const allInformationAboutClient = useSelector(state => state.order.infoAboutClient);

    useEffect(() => {
        const cartInLC = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        console.log(cartInLC)
    }, []);

    const takeOrder = useCallback((options) => {
        dispatch(setInfoAboutClient({
            name: options.client_name,
            surname: options.client_surname,
            email: options.client_email,
            phone: options.client_phone_number
        }))
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener('takeOrder', takeOrder);
        return () => {
            yankiEvents.removeListener('takeOrder', takeOrder);
        }
    }, [takeOrder]);

    return (
        <div className="Order">
            {orderFormMemoizeed}
            <TotalPriceCart total={total} setLanguage={t} course={course} currentValute={currentValute}/>
        </div>
    )
})