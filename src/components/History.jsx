import React, { useMemo } from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllOrders } from "../Redux/Cart/orderSlice";
import { CompletedOrder } from "./CompletedOrder";
import { reversePhoneNumber } from "../helpers/reversePhoneNumber";
import { scrollToElement } from "../helpers/scroll";
import { useTranslation } from "react-i18next";

export const History = React.memo(() => {

    let dispatch = useDispatch();
    let parent = useRef();

    let {t} = useTranslation();

    const allOrdersInState = useSelector(state => state.order.allOrders);


    const currentValute = useSelector(state => state.valute.currentValute);
    const currentCourseForPrice = useSelector(state => state.valute.course);

    useEffect(() => {
        const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
        if(!allOrdersInState.length && orders.length) dispatch(setAllOrders(orders));
        if(allOrdersInState.length !== orders.length) dispatch(setAllOrders(orders));
    }, [dispatch, allOrdersInState]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    let allOrdersInStateMemoizeed = useMemo(() => allOrdersInState && allOrdersInState.map(({email, items, name, phone, surname, total, valute, dateOptions, delivery, addressForDelivery, postName, payMethod}) => <CompletedOrder
    key={(`${reversePhoneNumber(phone)} ${dateOptions.date}`)}
    phone={phone}
    email={email}
    items={items}
    name={name}
    surname={surname}
    total={total}
    valute={valute}
    status={t("status-of-order")}
    dateOptions={dateOptions}
    delivery={delivery}
    addressForDelivery={addressForDelivery}
    postName={postName}
    payMethod={payMethod}
    setLng={t}
    currentValute={currentValute}
    course={currentCourseForPrice}
    />), [allOrdersInState, t, currentValute, currentCourseForPrice]);


    return (
        <div className="History" ref={parent}>
            <h3>{t('history-of-orders')}</h3>
            {allOrdersInStateMemoizeed}
        </div>
    )
})