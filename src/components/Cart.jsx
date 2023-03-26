import React, { useCallback, useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { configureCartState, clearAllCart } from "../Redux/Cart/cartSlice";
import { ItemInCart } from "./ItemInCart";
import { topFilterThunk } from "../Redux/Catalog/topFilterThunk";
import { findKey } from "../helpers/findKey";
import { yankiEvents } from "../events";
import {scrollToElement} from '../helpers/scroll';
import { ClearCartButton } from "./ClearCartButton";

export const Cart = React.memo(() => {

    let dispatch = useDispatch();

    let parent = useRef();

    const [colorOptions, setCurrentColorItem] = useState("");
    const [sizesState, setSizesState] = useState("");

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
        scrollToElement(parent.current);
    }, []);

    const clearCartParent = useCallback((bool) => {
        if(bool) {
            dispatch(clearAllCart());
            localStorage.removeItem('cart');
        }
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener('changeSizesState', changeSizesStateParent);
        yankiEvents.addListener('clearCart', clearCartParent);
        return () => {
            yankiEvents.removeListener('changeSizesState', changeSizesStateParent);
            yankiEvents.removeListener('clearCart', clearCartParent);
        }
    }, [clearCartParent]);

    useEffect(() => {
        let colorHash = topFilterTitles.find(elem => elem.title === 'color');
        setCurrentColorItem(findKey(colorHash, 'filter'));
    }, [topFilterTitles]);


    const changeSizesStateParent = (key) => setSizesState(key);

    let itemsMemoizeed = useMemo(() => itemsCart && itemsCart.map(elem => <ItemInCart 
    key={elem.id}
    translateKey={elem.key}
    hover={elem.hover}
    image={elem.image}
    sizes={elem.sizes}
    price={elem.price}
    like={elem.like}
    type={elem.type}
    color={elem.color}
    setLanguage={t}
    colorOptions={colorOptions}
    sizesState={sizesState}
    />), [itemsCart, t, colorOptions, sizesState]);

    return (
        <div className="Cart" ref={parent}>
            <p className="Navigation"><span>{t("main-page")}</span> <img className="ArrowCartTitle" src="https://i.ibb.co/jLth7Hr/Vector-9.png" alt="Arrow"/> <span>{t('cart')}</span></p>
            <h3>{t("your-order")}</h3>
            <div className="ItemsInCart">
                {itemsMemoizeed}
            </div>
            <ClearCartButton/>
        </div>
    )
})