import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { configureState, clearState } from "../Redux/Favourite/favouriteSlice";
import {scrollToElement} from '../helpers/scroll';
import { HintCurrentPage } from "./HintCurrentPage";
import { useTranslation } from "react-i18next";
import { ItemInFav } from "./ItemInFav";
import { useNavigate } from "react-router-dom";
import { yankiEvents } from "../events";


export const Favourite = () => {

    let dispatch = useDispatch();

    let parentNode = useRef();

    let {t} = useTranslation();

    let navigate = useNavigate();

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

    const detailsNav = useCallback((key) => {
        const uri = '/detailsitem/' + key
        navigate(uri);
    }, [navigate]);

    useEffect(() => {
        yankiEvents.addListener('goToDetails', detailsNav);
        return () => {
            yankiEvents.removeListener('goToDetails', detailsNav);
        }
    }, [detailsNav]);

    const clearLocalStorageAndSlice = () => {
        localStorage.clear();
        dispatch(clearState());
    }

    let favMemo = useMemo(() => fav.map(({id, hover, image, key}) => <ItemInFav key={id * Math.random()} hover={hover} image={image} name={key} setLng={t}/>), [fav, t])

    return (
        <div className="Favourite" ref={parentNode}>
            <HintCurrentPage mainPage={"main-page"} t={t} currentPage={"favourite-page"}/>
            <h2>{t('favourite-page')}</h2>
            {favMemo.length ? 
            <>
                <div className="GroupFavItems" style={{justifyContent: favMemo.length >= 5 ? 'space-between' : 'space-evenly', flexFlow: favMemo.length >= 5 ? 'wrap' : ""}}>
                    {favMemo}
                </div>
                <button className="ClearFavButton" onClick={clearLocalStorageAndSlice}>clear</button>
            </>
            :
                null
            }
        </div>
    )
}