import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataAboutItem } from "../Redux/Catalog/itemDetailSlice";
import { useTranslation } from "react-i18next";
import { catalogItemsThunk } from "../Redux/Catalog/catalogItemsThunk";
import { updateTypeOfItems } from "../Redux/Catalog/catalogItemsSlice";
import { concatArray } from "../helpers/concatArray";
import {scrollToElement} from '../helpers/scroll';
import { setAllInformation } from "../Redux/Catalog/itemDetailSlice";
import { addToCart, configureCartState } from "../Redux/Cart/cartSlice";
import { NavigationHintDetail } from "./NavigationHintDetail";
import { ViewItemDetails } from "./ViewItemDetails";
import { yankiEvents } from "../events";
import { gridItemThunk } from "../Redux/GridOfItem/gridItemThunk";
import { transformItemName } from "../helpers/transformNameOfItem";

export const ItemDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();

    let parentNode = useRef();

    let currentItem = params.itemkey;

    const dataAboutCurrentItem = useSelector(state => state.itemDetails.itemDetails);
    const allInformationAboutCurrentItem = useSelector(state => state.itemDetails.itemDetails.allInformation);
    const items = useSelector(state => state.items.items);
    const updatedItems = useSelector(state => state.items.updatedItems);
    const itemsCart = useSelector(state => state.cart.items);
    const colorsArray = useSelector(state => state.grid.colorArray);

    const [addButtonState, setAddButtonState] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if(itemsCart.length === 0 && data.length) dispatch(configureCartState(data));
        localStorage.setItem('cart', JSON.stringify(itemsCart));
        if(allInformationAboutCurrentItem !== undefined) itemsCart.forEach(elem => elem.key === allInformationAboutCurrentItem.key ? setAddButtonState(true) : setAddButtonState(false));
    }, [itemsCart, allInformationAboutCurrentItem, dispatch]);

    useEffect(() => {
        dispatch(
            setDataAboutItem({
                name: transformItemName(currentItem),
                key: currentItem
                })
        );
    }, [currentItem, dispatch]);
    
    useEffect(() => {
        if(!items.hasOwnProperty("jackets" || "coats" || "parkas" || "fur")) {
            dispatch(catalogItemsThunk);
        }
    }, [dispatch, items]);

    useEffect(() => {
        dispatch(updateTypeOfItems(concatArray([], items)));
    }, [items, dispatch]);

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, []);

    useEffect(() => {
        if(!colorsArray.length) dispatch(gridItemThunk);
    }, [dispatch, colorsArray]);

    useEffect(() => {
        let neededElementFromItemsArray = updatedItems.find(elem => {
            return elem.key === dataAboutCurrentItem.key;
        });
        dispatch(setAllInformation(neededElementFromItemsArray));
    }, [dataAboutCurrentItem, updatedItems, dispatch]);

    const addToCartReducer = useCallback((item) => {
        dispatch(addToCart(item));
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener("addToCart", addToCartReducer);
        return () => {
            yankiEvents.removeListener("addToCart", addToCartReducer);
        }
    }, [addToCartReducer]);

    let navigationHintMemoizeed = useMemo(() =>  <NavigationHintDetail 
    type={allInformationAboutCurrentItem !== undefined ? t(`${allInformationAboutCurrentItem.type}`) : null}
    translateKey={allInformationAboutCurrentItem !== undefined ? t(`${allInformationAboutCurrentItem.key}`) : null}
    ctl={t("ctl")}
    />, [allInformationAboutCurrentItem, t]);

    let viewItemsDetailsMemoizeed = useMemo(() => allInformationAboutCurrentItem && <ViewItemDetails 
    key={allInformationAboutCurrentItem.id}
    image={allInformationAboutCurrentItem.image}
    translateKey={t(`${allInformationAboutCurrentItem.key}`)}
    hover={allInformationAboutCurrentItem.hover}
    price={allInformationAboutCurrentItem.price === undefined ? "WHAT" : allInformationAboutCurrentItem.price}
    sizes={allInformationAboutCurrentItem.sizes}
    color={allInformationAboutCurrentItem.color}
    addButtonState={addButtonState}
    item={allInformationAboutCurrentItem}
    />, [allInformationAboutCurrentItem, addButtonState, t]);

    

    return (
        <div className="ItemDetails" ref={parentNode}>
            {navigationHintMemoizeed}
            <br/>
            {viewItemsDetailsMemoizeed}
        </div>
    )
})