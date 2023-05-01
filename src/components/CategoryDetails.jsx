import React, { useCallback } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useMemo } from "react";
import { catalogItemsThunk } from "../Redux/Catalog/catalogItemsThunk";
import { Item } from "./Item";
import { setCurrentCategory } from "../Redux/Catalog/currentCategorySlice";
import {scrollToElement} from '../helpers/scroll';
import { useNavigate } from "react-router-dom";
import { yankiEvents } from "../events";
import {motion} from 'framer-motion';

export const CategoryDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let parent = useRef();

    const {t} = useTranslation();

    let categoryName = params.categoryname;

    const items = useSelector(state => state.items.items);
    const currentCategory = useSelector(state => state.neededCategory.category);
    const currentValute = useSelector(state => state.valute.currentValute);
    const currentCourseForPrice = useSelector(state => state.valute.course);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

    const navigateToDetailsItem = useCallback((key) => {
        const uri = '/detailsitem/' + key;
        navigate(uri);
    }, [navigate]);

    useEffect(() => {
        yankiEvents.addListener("goToDetailsItem", navigateToDetailsItem);
        return () => {
            yankiEvents.removeListener("goToDetailsItem", navigateToDetailsItem);
        }
    }, [navigateToDetailsItem]);

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
        currentValute={currentValute}
        course={currentCourseForPrice}
        />), [currentCategory, currentValute, currentCourseForPrice]);


    return (
        <div className="DetailtAboutCurrentCategory">
            <h2>{t(`${categoryName}`)}</h2>
            <motion.div className="GroupItem" ref={parent}
            initial={{
                opacity: 0,
                x: 700
            }}
            whileInView={{
                x: 0,
                opacity: 1
            }}
            >
                {itemsMemoizeed}
            </motion.div>
        </div>
    )
});