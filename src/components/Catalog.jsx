import React, { useCallback } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useRef, useEffect, useMemo } from "react";
import { scrollToElement } from "../helpers/scroll";
import {catalogItemsThunk} from '../Redux/Catalog/catalogItemsThunk';
import { updateTypeOfItems } from "../Redux/Catalog/catalogItemsSlice";
import {Item} from '../components/Item';
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";
import { useNavigate } from "react-router-dom";
import { addToFavourite } from "../Redux/Favourite/favouriteSlice";
import { concatArray } from "../helpers/concatArray";
import { clotherThunk } from "../Redux/Catalog/clotherThunk";
import { topFilterThunk } from "../Redux/Catalog/topFilterThunk";

export const Catalog = React.memo(() => {

    let parentNode = useRef();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const {t} = useTranslation();

    const items = useSelector(state => state.items.items);
    const updatedItems = useSelector(state => state.items.updatedItems);
    const clothes = useSelector(state => state.clothes.clothes);
    const topFilterTitles = useSelector(state => state.topFilter.topFilterTitles);

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, [parentNode]);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('fav', JSON.stringify(fav));
    }, [fav]);

    const goToDetailsItemPage = useCallback((key) => {
        const uri = '/detailsitem/' + key;
        navigate(uri);
    }, [navigate]);

    const addToFav = useCallback((item) => {
        dispatch(addToFavourite(item));
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener('goToDetailsItem', goToDetailsItemPage);
        yankiEvents.addListener("addToFav", addToFav);
        return () => {
            yankiEvents.removeListener('goToDetailsItem', goToDetailsItemPage);
            yankiEvents.removeListener("addToFav", addToFav);
        }
    }, [goToDetailsItemPage, addToFav]);

    useEffect(() => {
        dispatch(updateTypeOfItems(concatArray([], items)));
    }, [items, dispatch]);

    useEffect(() => {
        if(!clothes.length) dispatch(clotherThunk);
    }, [dispatch, clothes]);

    useEffect(() => {
        if(!topFilterTitles.length) dispatch(topFilterThunk);
    }, [dispatch, topFilterTitles]);

    let itemsMemoizeed = useMemo(() => updatedItems && 
        updatedItems.map(e => <Item
        key={e.id * Math.random()}
        hoverImage={e.hover}
        translateKey={e.key} 
        sizes={e.sizes}
        image={e.image}
        price={e.price}
        like={e.like}
        item={e}
        />), [updatedItems]
    );

    console.log(topFilterTitles)

    return (
        <div className="Catalog">
            <h3 className="CatalogTitle">{t("catalog-title")}</h3>
            <div className="GroupItem" ref={parentNode}>
                {itemsMemoizeed}
            </div>
        </div>
    )
})