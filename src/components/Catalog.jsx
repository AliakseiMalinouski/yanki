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
import { EmptyCatalog } from "./EmptyCatalog";
import { sortByPriceOfItem } from "../helpers/SortByPriceOfItem";

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
    const currentValute = useSelector(state => state.valute.currentValute);
    const currentCourseForPrice = useSelector(state => state.valute.course);
    
    const [currentClother, setCurrentClothes] = useState("new");
    const [topFilterState, setTopFilterState] = useState("");
    const [currentColor, setCurrentColor] = useState("");
    const [resetState, setResetState] = useState(false);
    const [currentPriceOperation, setCurrentPriceOperation] = useState("");
    const [itemsAfterSorted, setItemsAfterSorted] = useState([]);

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

    const changeTopFilterStateParent = useCallback((title) => {
        if(topFilterState !== "") {
            setTopFilterState("");
            setTopFilterState(title);
        }
        else setTopFilterState(title);
    }, [topFilterState]);

    const filterByClothes = useCallback((title) => {
        setCurrentClothes(title);
        if(!resetState) setResetState(true);
    }, [resetState]);

    const selectTopFilterTypeGenerally = useCallback((object) => {
        if(!resetState) setResetState(true);
        if(object.type === 'color') {
            setCurrentColor(object.text);
        }
        else if(object.type === 'price') {
            setCurrentPriceOperation(object.text);
        }
    }, [resetState])

    useEffect(() => {
        yankiEvents.addListener('goToDetailsItem', goToDetailsItemPage);
        yankiEvents.addListener("addToFav", addToFav);
        yankiEvents.addListener("filteredByClothes", filterByClothes);
        yankiEvents.addListener("changeTopFilterState", changeTopFilterStateParent);
        yankiEvents.addListener("selectTopFilterType", selectTopFilterTypeGenerally);
        yankiEvents.addListener("resetAllFilters", resetAllFilters);
        return () => {
            yankiEvents.removeListener('goToDetailsItem', goToDetailsItemPage);
            yankiEvents.removeListener("addToFav", addToFav);
            yankiEvents.removeListener("filteredByClothes", filterByClothes);
            yankiEvents.removeListener("changeTopFilterState", changeTopFilterStateParent);
            yankiEvents.removeListener("selectTopFilterType", selectTopFilterTypeGenerally);
            yankiEvents.removeListener("resetAllFilters", resetAllFilters);
        }
    }, [goToDetailsItemPage, addToFav, changeTopFilterStateParent, filterByClothes, selectTopFilterTypeGenerally]);

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
        updatedItems.filter(elem => currentColor !== "" ? elem.color === currentColor : elem).map(e => <Item
        key={e.id * Math.random()}
        hoverImage={e.hover}
        translateKey={e.key} 
        sizes={e.sizes}
        image={e.image}
        price={e.price}
        like={e.like}
        item={e}
        currentValute={currentValute}
        course={currentCourseForPrice}
        />), [updatedItems, currentColor, currentValute, currentCourseForPrice]
    );

    let itemsFiltetedMemoizeed = useMemo(() => updatedItems && 
    updatedItems.filter(elem => {
        if(currentColor === "") {
            return elem.type === currentClother;
        }
        else {
            return elem.color === currentColor && elem.type === currentClother;
        }
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
    currentValute={currentValute}
    course={currentCourseForPrice}
    />), [updatedItems, currentClother, currentColor, currentValute, currentCourseForPrice])
    
    console.log(currentCourseForPrice);

    let clothesMemoizeed = useMemo(() => clothes && clothes.map(({id, title}) => <ClotherTitle key={id} title={title} setLanguage={t} currentClother={currentClother}/>), [clothes, t, currentClother]);

    let topFilterTitlesMemoizeed = useMemo(() => topFilterTitles.map(({id, title, filter}) => <TopFilterTitle key={id} resetState={resetState} filter={filter} title={title} setLanguage={t} topFilterState={topFilterState}/>), [topFilterTitles, t, topFilterState, resetState]);

    const resetAllFilters = (bool) => {
        if(bool) {
            setCurrentColor("");
            setCurrentClothes("new");
            setTopFilterState("");
            setResetState(false);
        }
    }

    useEffect(() => {
        let sortedItems = currentPriceOperation && sortByPriceOfItem(updatedItems, currentPriceOperation, 'price');
        setItemsAfterSorted(sortedItems);
    }, [updatedItems, currentPriceOperation]);


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
                <div className="GroupItem" ref={parentNode} style={{flexFlow: currentClother === "new" ? "wrap" : "", width: itemsFiltetedMemoizeed.length < 4 ? "100%" : "auto", justifyContent: itemsFiltetedMemoizeed.length < 4 && currentClother !== 'new' ? "flex-start" : "space-between"}}>
                    {
                        currentClother === "new" ? itemsMemoizeed : itemsFiltetedMemoizeed
                    }
                    {
                        currentClother !== "new" && !itemsFiltetedMemoizeed.length ? <EmptyCatalog/> : null
                    }
                </div>
            </div>
        </div>
    )
})