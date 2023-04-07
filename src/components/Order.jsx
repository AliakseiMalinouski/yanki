import React, { useCallback, useMemo } from "react";
import { OrderForm } from "./OrderForm";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";
import { TotalPriceCart } from "./TotalPriceCart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInfoAboutClient } from "../Redux/Cart/orderSlice";
import { addNewOrder } from "../helpers/addNewOrder";
import { clearAllCart } from "../Redux/Cart/cartSlice";

export const Order = React.memo(({course, currentValute, total}) => {

    const {t} = useTranslation();
    let dispatch = useDispatch();

    let orderFormMemoizeed = useMemo(() => <OrderForm setLanguage={t}/>, [t]);

    const [currentOrder, setCurrentOrder] = useState([]);


    useEffect(() => {
        const cartInLC = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCurrentOrder(cartInLC);
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
    }, []);

    const takeOrder = useCallback((options) => {
        dispatch(setInfoAboutClient({
            name: options.client_name,
            surname: options.client_surname,
            email: options.client_email,
            phone: options.client_phone_number,
            total: total,
            valute: currentValute,
            items: currentOrder
        }));
        addNewOrder({
            name: options.client_name,
            surname: options.client_surname,
            email: options.client_email,
            phone: options.client_phone_number,
            total: total,
            valute: currentValute,
            items: currentOrder
        });
        localStorage.removeItem('cart');
        dispatch(clearAllCart());
        setCurrentOrder([]);
    }, [dispatch, total, currentValute, currentOrder]);

    useEffect(() => {
        yankiEvents.addListener('takeOrder', takeOrder);
        return () => {
            yankiEvents.removeListener('takeOrder', takeOrder);
        }
    }, [takeOrder]);

    return (
        <div className="Order">
            {
                currentOrder.length
                ?
                <>
                    {orderFormMemoizeed}
                    <TotalPriceCart total={total} setLanguage={t} course={course} currentValute={currentValute}/>
                </>
                :
                null
            }
        </div>
    )
})