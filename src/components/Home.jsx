import React, { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesThunk } from "../Redux/Home/categoriesThunk";
import { Category } from "./Category";
import { yankiEvents } from "../events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { News } from "./News";
import { configLetterThunk } from "../Redux/Subscribe/configLetterThunk";

export const Home = React.memo(() => {
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const {t} = useTranslation();

    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(configLetterThunk);
    }, [dispatch])

    useEffect(() => {
        if(!categories.length) dispatch(categoriesThunk)
    }, [dispatch, categories]);

    const goToDetailsCategory = useCallback((key) => {
        const uri = "/categoriesdetails/" + key;
        navigate(uri);
    }, [navigate]);

    useEffect(() => {
        yankiEvents.addListener("goToDetailsCategory", goToDetailsCategory);
        return () => {
            yankiEvents.removeListener("goToDetailsCategory", goToDetailsCategory);
        }
    }, [goToDetailsCategory]);

    let categoriesMemoizeed = useMemo(() => categories === undefined || categories === null || categories === []
    ?
    null
    :
    categories.map(e => <Category key={e.id} title={e.title} translateKey={e.key} link={e.link} image={e.image}/>), [categories]
    )

    return (
        <div className="Home">
            <h2 className="CategoryTitle">{t("category-title")}</h2>
            <div className="Categories">
                {categoriesMemoizeed}
            </div>
            <News/>
        </div>
    )
})