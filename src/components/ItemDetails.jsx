import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataAboutItem } from "../Redux/Catalog/itemDetailSlice";
import { useTranslation } from "react-i18next";

export const ItemDetails = React.memo(() => {

    let params = useParams();
    let dispatch = useDispatch();

    let currentItem = params.itemkey;

    const dataAboutCurrentItem = useSelector(state => state.itemDetails.itemDetails);

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


    return (
        <div className="ItemDetails">
            some info about {t(`${dataAboutCurrentItem.key}`)}
        </div>
    )
})