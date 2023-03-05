import React from "react";
import { useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { catalogItemsThunk } from "../Redux/Catalog/catalogItemsThunk";
import { setCurrentCategory } from "../Redux/Catalog/currentCategorySlice";

export const CategoryDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();

    const {t} = useTranslation();

    let categoryName = params.categoryname;

    const items = useSelector(state => state.items.items);
    const currentCategory = useSelector(state => state.neededCategory.category);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

    useEffect(() => {
        const findNeededElem = () => {
            for (let item in items) {
                if(item === categoryName.toLowerCase()) {
                    return item;
                }
            }
        }
        let neededArrayElem = items[findNeededElem()];
        dispatch(setCurrentCategory(neededArrayElem));
    }, [items, categoryName, dispatch]);

    console.log(currentCategory)

    return (
        <div> SOME INFO ABOUT {t(`${categoryName}`)}</div>
    )
});