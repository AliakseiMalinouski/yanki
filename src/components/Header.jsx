import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navLinkThunk } from "../Redux/Header/navLinkThunk";
import { NavLinkHeader } from "./NavLinkHeader";
import { useLocation } from "react-router-dom";
import { TranslateSelect } from "./TranslateSelect";
import { Currency } from "./Currency";

export const Header = React.memo(() => {

    let dispatch = useDispatch();
    let location = useLocation();

    const navLinks = useSelector(state => state.navLinks.navLinks);

    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        dispatch(navLinkThunk);
    }, [dispatch]);

    useEffect(() => {
        let pageLocation = location.pathname;
        setCurrentPage(pageLocation);
    }, [location]);
    
    let navLinksMemoizeed = useMemo(() => navLinks === undefined || navLinks === null || navLinks === []
    ?
    null
    :
    navLinks.map(e => <NavLinkHeader key={e.id} title={e.title} link={e.link} currentPage={currentPage}/>), [navLinks, currentPage]);

    return (
        <div className="HeaderContent">
            <img src="https://i.ibb.co/hL66HBv/Group-1.png" alt="Menu"/>
            <ul className="NavLinks">
                {navLinksMemoizeed}
            </ul>
            <img src="https://i.ibb.co/km4vNVd/YANKI.png" alt="Logo"/>
            <TranslateSelect/>
            <Currency/>
        </div>
    )
})