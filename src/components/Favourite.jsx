import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { configureState, clearState } from "../Redux/Favourite/favouriteSlice";
import {scrollToElement} from '../helpers/scroll';


export const Favourite = () => {

    let dispatch = useDispatch();

    let parentNode = useRef();

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

    return (
        <div className="Favourite" ref={parentNode}>
            {
                fav.map(e => <div key={e.id}>{e.key}</div>)
            }
            <button onClick={clearLocalStorageAndSlice}>clear</button>
        </div>
    )
}