import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { configureState, clearState } from "../Redux/Favourite/favouriteSlice";



export const Favourite = () => {

    let dispatch = useDispatch();

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        const data = localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [];
        if(data.length && !fav.length) {
            dispatch(configureState(data));
        }
    }, [fav, dispatch]);

    return (
        <div className="Favourite">
            {
                fav.map(e => <div key={e.id}>{e.key}</div>)
            }
            <button onClick={() => {
                localStorage.clear();
                dispatch(clearState());
            }}>clear</button>
        </div>
    )
}