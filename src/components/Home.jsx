import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesThunk } from "../Redux/Home/categoriesThunk";
import { Category } from "./Category";
import { yankiEvents } from "../events";
import { useNavigate } from "react-router-dom";

export const Home = React.memo(() => {
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        if(!categories.length) dispatch(categoriesThunk)
    }, [dispatch, categories]);

    useEffect(() => {
        yankiEvents.addListener("goToDetailsCategory", goToDetailsCategory);
        return () => {
            yankiEvents.removeListener("goToDetailsCategory", goToDetailsCategory);
        }
    }, []);

    let categoriesMemoizeed = useMemo(() => categories === undefined || categories === null || categories === []
    ?
    null
    :
    categories.map(e => <Category key={e.id} title={e.title} translateKey={e.key} link={e.link} image={e.image}/>), [categories]
    )

    const goToDetailsCategory = (key) => {
        const uri = "/categoriesdetails/" + key;
        navigate(uri);
    }

    return (
        <div className="Home">
            <div className="Categories">
                {categoriesMemoizeed}
            </div>
        </div>
    )
})