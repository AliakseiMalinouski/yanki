import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { configureCartState, clearAllCart } from "../Redux/Cart/cartSlice";
import { ItemInCart } from "./ItemInCart";
import { topFilterThunk } from "../Redux/Catalog/topFilterThunk";
import { findKey } from "../helpers/findKey";

export const Cart = React.memo(() => {

    let dispatch = useDispatch();

    const [colorOptions, setCurrentColorItem] = useState("");

    const itemsCart = useSelector(state => state.cart.items);
    const topFilterTitles = useSelector(state => state.topFilter.topFilterTitles);

    const {t} = useTranslation();

    useEffect(() => {
        const data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if(data.length && !itemsCart.length) dispatch(configureCartState(data));
    }, [dispatch, itemsCart]);

    useEffect(() => {
        dispatch(topFilterThunk);
    }, [dispatch]);

    useEffect(() => {
        let colorHash = topFilterTitles.find(elem => elem.title === 'color');
        setCurrentColorItem(findKey(colorHash, 'filter'));
    }, [topFilterTitles]);

    const clearCart = () => {
        dispatch(clearAllCart());
        localStorage.removeItem('cart');
    }

    let itemsMemoizeed = useMemo(() => itemsCart && itemsCart.map(elem => <ItemInCart 
    key={elem.id}
    translateKey={elem.key}
    hover={elem.hover}
    image={elem.image}
    sizes={elem.sizes}
    like={elem.like}
    type={elem.type}
    color={elem.color}
    setLanguage={t}
    colorOptions={colorOptions}
    />), [itemsCart, t, colorOptions]);

    return (
        <div className="Cart">
            <div className="ItemsInCart">
                {itemsMemoizeed}
            </div>
            <button onClick={clearCart}>clear cart</button>
        </div>
    )
})