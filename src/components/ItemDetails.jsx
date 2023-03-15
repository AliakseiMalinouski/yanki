import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataAboutItem } from "../Redux/Catalog/itemDetailSlice";
import { useTranslation } from "react-i18next";
import { catalogItemsThunk } from "../Redux/Catalog/catalogItemsThunk";
import { updateTypeOfItems } from "../Redux/Catalog/catalogItemsSlice";
import { concatArray } from "../helpers/concatArray";
import {scrollToElement} from '../helpers/scroll';
import { setAllInformation } from "../Redux/Catalog/itemDetailSlice";

export const ItemDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();

    let parentNode = useRef();

    let currentItem = params.itemkey;

    const dataAboutCurrentItem = useSelector(state => state.itemDetails.itemDetails);
    const allInformationAboutCurrentItem = useSelector(state => state.itemDetails.itemDetails.allInformation);
    const items = useSelector(state => state.items.items);
    const updatedItems = useSelector(state => state.items.updatedItems);

    const {t} = useTranslation();

    useEffect(() => {
        const transformItemName = (name) => {
            let result = [];
            let nameCharArray = name.split("");
            for(let i = 0; i < nameCharArray.length; i++) {
                let elem = nameCharArray[i];
                if(elem === "-") {
                    result.push(" ");
                }
                else {
                    result.push(elem);
                }
                for(let j = 0; j < result.length; j++) {
                    result[0] = result[0].toUpperCase();
                    if(result[j - 1] === " ") {
                        result[j] = result[j].toUpperCase();
                    }
                }
            }
            return result.join("");
        }
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
        let neededElementFromItemsArray = updatedItems.find(elem => {
            return elem.key === dataAboutCurrentItem.key;
        });
        dispatch(setAllInformation(neededElementFromItemsArray));
    }, [dataAboutCurrentItem, updatedItems, dispatch]);

    console.log(allInformationAboutCurrentItem)

    return (
        <div className="ItemDetails" ref={parentNode}>
            some info about {t(`${dataAboutCurrentItem.key}`)}
        </div>
    )
})