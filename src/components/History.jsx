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

    useEffect(() => {
        const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
        if(!allOrdersInState.length && orders.length) dispatch(setAllOrders(orders));
    }, [dispatch, allOrdersInState]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    let allOrdersInStateMemoizeed = useMemo(() => allOrdersInState && allOrdersInState.map(({email, items, name, phone, surname, total, valute, dateOptions}) => <CompletedOrder
    key={reversePhoneNumber(phone)}
    email={email}
    items={items}
    name={name}
    surname={surname}
    total={total}
    valute={valute}
    status={t("status-of-order")}
    dateOptions={dateOptions}
    />), [allOrdersInState, t]);

    return (
        <div className="History" ref={parent}>
            {allOrdersInStateMemoizeed}
        </div>
    )
})