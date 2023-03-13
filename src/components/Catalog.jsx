import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useRef, useEffect, useMemo } from "react";
import { scrollToElement } from "../helpers/scroll";
import {catalogItemsThunk} from '../Redux/Catalog/catalogItemsThunk';
import { updateTypeOfItems } from "../Redux/Catalog/catalogItemsSlice";
import {Item} from '../components/Item';
import { useTranslation } from "react-i18next";

export const Catalog = React.memo(() => {

    let parentNode = useRef();
    let dispatch = useDispatch();

    const {t} = useTranslation();

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

    let itemsMemoizeed = useMemo(() => updatedItems && 
        updatedItems.map(({id, hover, image, key, like, price, sizes}) => <Item
        key={id}
        hoverImage={hover}
        translateKey={key} 
        sizes={sizes}
        image={image}
        price={price}
        like={like}
        />), [updatedItems]
    )

    return (
        <div className="Catalog">
            <h3 className="CatalogTitle">{t("catalog-title")}</h3>
            <div className="GroupItem" ref={parentNode}>
                {itemsMemoizeed}
            </div>
        </div>
    )
})