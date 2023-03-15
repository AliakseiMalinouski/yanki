import React, { useCallback } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useRef, useEffect, useMemo, useState } from "react";
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
import { ClotherTitle } from "./ClotherTitle";
import { TopFilterTitle } from "./TopFilterTitle";

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
    
    const [currentClother, setCurrentClothes] = useState("new");
    const [topFilterState, setTopFilterState] = useState(false);

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
        yankiEvents.addListener("filteredByClothes", filterByClothes);
        yankiEvents.addListener("changeTopFilterState", changeTopFilterStateParent);
        return () => {
            yankiEvents.removeListener('goToDetailsItem', goToDetailsItemPage);
            yankiEvents.removeListener("addToFav", addToFav);
            yankiEvents.removeListener("filteredByClothes", filterByClothes);
            yankiEvents.removeListener("changeTopFilterState", changeTopFilterStateParent);
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

    let itemsFiltetedMemoizeed = useMemo(() => updatedItems && 
    updatedItems.filter(elem => {
        return elem.type === currentClother;
    }).map(e => <Item
    key={e.id * Math.random()}
    hoverImage={e.hover}
    translateKey={e.key} 
    sizes={e.sizes}
    image={e.image}
    price={e.price}
    like={e.like}
    item={e}
    flexState={currentClother === 'new' ? null : "35px"}
    />), [updatedItems, currentClother])

    let clothesMemoizeed = useMemo(() => clothes && clothes.map(({id, title}) => <ClotherTitle key={id} title={title} setLanguage={t} currentClother={currentClother}/>), [clothes, t, currentClother]);

    let topFilterTitlesMemoizeed = useMemo(() => topFilterTitles.map(({id, title}) => <TopFilterTitle key={id} title={title} setLanguage={t} topFilterState={topFilterState}/>), [topFilterTitles, t, topFilterState]);

    const filterByClothes = (title) => {
        setCurrentClothes(title);
    }

    const changeTopFilterStateParent = (title) => {
        setTopFilterState(title);
    }

    return (
        <div className="Catalog">
            <h3 className="CatalogTitle">{t("catalog-title")}</h3>
            <div className="TopFilter">
                {topFilterTitlesMemoizeed}
            </div>
            <div className="FlexWrapper" style={{justifyContent: currentClother === "new" ? "" : "flex-start"}}>
                <div className="ClothesFilter">
                    {clothesMemoizeed}    
                </div>
                <div className="GroupItem" ref={parentNode} style={{flexFlow: currentClother === "new" ? "wrap" : ""}}>
                    {
                        currentClother === "new" ? itemsMemoizeed : itemsFiltetedMemoizeed
                    }
                </div>
            </div>
        </div>
    )
})