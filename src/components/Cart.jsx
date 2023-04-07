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
import { removeFromCart } from "../Redux/Cart/cartSlice";
import { spliceLetters } from "../helpers/spliceLetters";
import { TotalPriceCart } from "./TotalPriceCart";
import { HintCurrentPage } from "./HintCurrentPage";
import { Order } from "./Order";

export const Cart = React.memo(() => {

    let dispatch = useDispatch();

    let parent = useRef();

    const [colorOptions, setCurrentColorItem] = useState("");
    const [sizesState, setSizesState] = useState("");
    const [total, setTotal] = useState(null);

    const itemsCart = useSelector(state => state.cart.items);
    const topFilterTitles = useSelector(state => state.topFilter.topFilterTitles);
    const currentValute = useSelector(state => state.valute.currentValute);
    const currentCourseForPrice = useSelector(state => state.valute.course);

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

    useEffect(() => {
        let totalArray = spliceLetters([], itemsCart, 'price');
        let total = totalArray.reduce((acc, item) => {
            return acc + item; 
        }, 0);
        setTotal(total);
    }, [itemsCart]);


    const clearCartParent = useCallback((bool) => {
        if(bool) {
            dispatch(clearAllCart());
            localStorage.removeItem('cart');
        }
    }, [dispatch]);

    const deleteItemFromCartParent = useCallback((item) => {
        dispatch(removeFromCart(item));
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener('changeSizesState', changeSizesStateParent);
        yankiEvents.addListener('clearCart', clearCartParent);
        yankiEvents.addListener('deleteItemFromCart', deleteItemFromCartParent);
        return () => {
            yankiEvents.removeListener('changeSizesState', changeSizesStateParent);
            yankiEvents.removeListener('clearCart', clearCartParent);
            yankiEvents.removeListener('deleteItemFromCart', deleteItemFromCartParent);
        }
    }, [clearCartParent, deleteItemFromCartParent]);

    useEffect(() => {
        let colorHash = topFilterTitles.find(elem => elem.title === 'color');
        setCurrentColorItem(findKey(colorHash, 'filter'));
    }, [topFilterTitles]);


    const changeSizesStateParent = (key) => setSizesState(key);

    let itemsMemoizeed = useMemo(() => itemsCart && itemsCart.map(elem => <ItemInCart 
    key={elem.id * Math.random()}
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
    item={elem}
    currentValute={currentValute}
    course={currentCourseForPrice}
    />), [itemsCart, t, colorOptions, sizesState, currentCourseForPrice, currentCourseForPrice]);

    return (
        <>
        <div className="Cart" ref={parent}>
            <HintCurrentPage mainPage={"main-page"} t={t} currentPage={"cart"}/>
            <h3>{t("your-order")}</h3>
            <div className="ItemsInCart">
                {itemsMemoizeed}
            </div>
            <ClearCartButton/>
            <TotalPriceCart total={total} setLanguage={t} course={currentCourseForPrice} currentValute={currentValute}/>
        </div>
        <Order total={total} course={currentCourseForPrice} currentValute={currentValute}/>
        </>
    )
})