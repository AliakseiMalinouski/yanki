import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { configureState, clearState } from "../Redux/Favourite/favouriteSlice";
import {scrollToElement} from '../helpers/scroll';
import { HintCurrentPage } from "./HintCurrentPage";
import { useTranslation } from "react-i18next";

export const Favourite = () => {

    let dispatch = useDispatch();

    let parentNode = useRef();

    let {t} = useTranslation();

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        const data = localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [];
        if(data.length && !fav.length) {
            dispatch(configureState(data));
        }
    }, [fav, dispatch]);

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, []);


    const clearLocalStorageAndSlice = () => {
        localStorage.clear();
        dispatch(clearState());
    }

    let favMemo = useMemo(() => fav.map(e => <div key={e.id}>{e.key}</div>), [fav])

    return (
        <div className="Favourite" ref={parentNode}>
            <HintCurrentPage mainPage={"main-page"} t={t} currentPage={"favourite-page"}/>
            {favMemo}
            <button onClick={clearLocalStorageAndSlice}>clear</button>
        </div>
    )
}