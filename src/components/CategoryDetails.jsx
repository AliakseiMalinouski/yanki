import React from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useMemo } from "react";
import { catalogItemsThunk } from "../Redux/Catalog/catalogItemsThunk";
import { Item } from "./Item";
import { setCurrentCategory } from "../Redux/Catalog/currentCategorySlice";
import {scrollToElement} from '../helpers/scroll';

export const CategoryDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();

    let parent = useRef();

    const {t} = useTranslation();

    let categoryName = params.categoryname;

    const items = useSelector(state => state.items.items);
    const currentCategory = useSelector(state => state.neededCategory.category);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

    useEffect(() => {
        const findNeededElem = (key) => {
            for (let item in items) {
                if(item === key.toLowerCase()) {
                    return item;
                }
            }
        }
        let neededArrayElem = items[findNeededElem(categoryName)];
        dispatch(setCurrentCategory(neededArrayElem));
    }, [items, categoryName, dispatch]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);
    

    let itemsMemoizeed = useMemo(() => currentCategory && currentCategory.map(e => <Item 
        key={e.id}
        translateKey={e.key}
        image={e.image}
        like={e.like}
        price={e.price}
        sizes={e.sizes}
        hoverImage={e.hover}
        />), [currentCategory]);

    return (
        <div className="DetailtAboutCurrentCategory">
            <h2>{t(`${categoryName}`)}</h2>
            <div className="GroupItem" ref={parent}>
                {itemsMemoizeed}
            </div>
        </div>
    )
});