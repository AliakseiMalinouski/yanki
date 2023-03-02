import React, { useMemo } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { footerContentThunk } from "../Redux/Footer/footerContentThunk";
import { FooterTitles } from "./FooterTitles";
import { FooterList } from "./FooterList";

export const Footer = () => {

    let dispatch = useDispatch();

    const footerContent = useSelector(state => state.footerContent.content);
    
    useEffect(() => {
        if(!footerContent.hasOwnProperty("titles" || "lists")) dispatch(footerContentThunk);
    }, [dispatch, footerContent]);

    let footerTitlesMemoizeed = useMemo(() => footerContent.titles === [] || footerContent.titles === undefined || footerContent.titles === null
    ?
    null
    :
    footerContent.titles.map(e => <FooterTitles key={e.id} title={e.title}/>), [footerContent]
    )

    let footerListsMemoizeed = useMemo(() => footerContent.lists === [] || footerContent.lists === undefined || footerContent.lists === null
    ?
    null
    :
    footerContent.lists.map(e => <FooterList key={e.id} text={e.text}/>), [footerContent]
    )

    return (
        <div className="FooterContent">
            <div className="FooterTitles">
                {footerTitlesMemoizeed}
            </div>
            <div className="FooterLists">
                {footerListsMemoizeed}
            </div>
        </div>
    )
}