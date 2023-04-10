import React, { useCallback, useMemo } from "react";
import { OrderForm } from "./OrderForm";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";
import { TotalPriceCart } from "./TotalPriceCart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfoAboutClient } from "../Redux/Cart/orderSlice";
import { addNewOrder } from "../helpers/addNewOrder";
import { clearAllCart } from "../Redux/Cart/cartSlice";
import {useNavigate} from 'react-router-dom';
import { typeOfDeliveryThunk } from "../Redux/Cart/typeOfDeliveryThunk";

export const Order = React.memo(({course, currentValute, total}) => {

    const {t} = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let orderFormMemoizeed = useMemo(() => <OrderForm setLanguage={t}/>, [t]);

    const [currentOrder, setCurrentOrder] = useState([]);

    const typesOfDelivery = useSelector(state => state.delivery.types);

    useEffect(() => {
        const cartInLC = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCurrentOrder(cartInLC);
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        dispatch(typeOfDeliveryThunk)
    }, [dispatch]);
    
    const takeOrder = useCallback((options) => {
        let currentDate = new Date();
        dispatch(setInfoAboutClient({
            name: options.client_name,
            surname: options.client_surname,
            email: options.client_email,
            phone: options.client_phone_number,
            total: total,
            valute: currentValute,
            items: currentOrder,
            dateOptions: {
                date: currentDate.getDate(),
                minutes: currentDate.getMinutes(),
                hours: currentDate.getHours(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                time: currentDate.getTime(),
            }
        }));
        addNewOrder({
            name: options.client_name,
            surname: options.client_surname,
            email: options.client_email,
            phone: options.client_phone_number,
            total: total,
            valute: currentValute,
            items: currentOrder,
            dateOptions: {
                date: currentDate.getDate(),
                minutes: currentDate.getMinutes(),
                hours: currentDate.getHours(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                time: currentDate.getTime(),
            }
        });
        localStorage.removeItem('cart');
        dispatch(clearAllCart());
        setCurrentOrder([]);
        navigate('/history');
    }, [dispatch, total, currentValute, currentOrder, navigate]);

    useEffect(() => {
        yankiEvents.addListener('takeOrder', takeOrder);
        return () => {
            yankiEvents.removeListener('takeOrder', takeOrder);
        }
    }, [takeOrder]);

    return (
        <div className="Order">
            <h3 className="Ordering">{t('do-order')}</h3>
            <h5 className="PersonalData">{t('personal-data')}</h5>
            {
                currentOrder.length
                ?
                
                <div className="OrderFlexBlock">
                    {orderFormMemoizeed}
                    <div>
                        <TotalPriceCart total={total} setLanguage={t} course={course} currentValute={currentValute}/>
                    </div>
                </div>
                
                :
                null
            }
        </div>
    )
})