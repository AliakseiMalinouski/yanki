import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useRef, useEffect } from "react";
import { scrollToElement } from "../helpers/scroll";
import {catalogItemsThunk} from '../Redux/Catalog/catalogItemsThunk';
import { updateTypeOfItems } from "../Redux/Catalog/catalogItemsSlice";

export const Catalog = React.memo(() => {

    let parentNode = useRef();
    let dispatch = useDispatch();

    const items = useSelector(state => state.items.items);
    const updatedItems = useSelector(state => state.items.updatedItems);

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, [parentNode]);

    useEffect(() => {
        dispatch(catalogItemsThunk);
    }, [dispatch]);

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

    console.log(updatedItems);

    return (
        <div className="Catalog" ref={parentNode}>
            Catalog
        </div>
    )
})