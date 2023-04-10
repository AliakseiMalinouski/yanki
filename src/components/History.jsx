import React, { useMemo } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllOrders } from "../Redux/Cart/orderSlice";
import { CompletedOrder } from "./CompletedOrder";
import { reversePhoneNumber } from "../helpers/reversePhoneNumber";

export const History = React.memo(() => {

    let dispatch = useDispatch();

    const allOrdersInState = useSelector(state => state.order.allOrders);

    useEffect(() => {
        const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
        if(!allOrdersInState.length && orders.length) dispatch(setAllOrders(orders));
    }, [dispatch, allOrdersInState]);

    let allOrdersInStateMemoizeed = useMemo(() => allOrdersInState.map(({email, items, name, phone, surname, total, valute}) => <CompletedOrder
    key={reversePhoneNumber(phone)}
    email={email}
    items={items}
    name={name}
    surname={surname}
    total={total}
    valute={valute}
    />), [allOrdersInState]);

    return (
        <div className="History">
            history
        </div>
    )
})