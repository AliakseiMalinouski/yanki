import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { configureCartState, clearAllCart } from "../Redux/Cart/cartSlice";

export const Cart = React.memo(() => {

    let dispatch = useDispatch();

    const itemsCart = useSelector(state => state.cart.items);

    const {t} = useTranslation();

    useEffect(() => {
        const data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if(data.length && !itemsCart.length) dispatch(configureCartState(data));
    }, [dispatch, itemsCart]);

    const clearCart = () => {
        dispatch(clearAllCart());
        localStorage.removeItem('cart');
    }

    console.log(itemsCart)

    return (
        <div className="Cart">
            {
                itemsCart.map(e => <div key={e.id}>{t(`${e.key}`)}</div>)
            }
            <button onClick={clearCart}>clear cart</button>
        </div>
    )
})