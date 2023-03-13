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

export const Catalog = React.memo(() => {

    let parentNode = useRef();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const {t} = useTranslation();

    const items = useSelector(state => state.items.items);
    const updatedItems = useSelector(state => state.items.updatedItems);

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, [parentNode]);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

    const goToDetailsItemPage = useCallback((key) => {
        const uri = '/detailsitem/' + key;
        navigate(uri);
    }, [navigate]);

    const addToFav = useCallback((item) => {
        dispatch(addToFavourite(item));
    }, [dispatch])

    useEffect(() => {
        yankiEvents.addListener('goToDetailsItem', goToDetailsItemPage);
        yankiEvents.addListener("addToFav", addToFav);
        return () => {
            yankiEvents.removeListener('goToDetailsItem', goToDetailsItemPage);
            yankiEvents.removeListener("addToFav", addToFav);
        }
    }, [goToDetailsItemPage, addToFav]);

    useEffect(() => {
        const concatArray = (emptyArray, object) => {
            for(let key in object) {
                if(typeof object === 'object') {
                    emptyArray = [...emptyArray, ...object[key]];
                }
            }
            return emptyArray;
        }
        dispatch(updateTypeOfItems(concatArray([], items)));
    }, [items, dispatch]);

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

    console.log(fav);

    return (
        <div className="Catalog">
            <h3 className="CatalogTitle">{t("catalog-title")}</h3>
            <div className="GroupItem" ref={parentNode}>
                {itemsMemoizeed}
            </div>
        </div>
    )
})