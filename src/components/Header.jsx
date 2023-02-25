import React from "react";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navLinkThunk } from "../Redux/Header/navLinkThunk";
import { NavLinkHeader } from "./NavLinkHeader";

export const Header = React.memo(() => {

    let dispatch = useDispatch();

    const navLinks = useSelector(state => state.navLinks.navLinks);

    useEffect(() => {
        dispatch(navLinkThunk);
    }, [dispatch]);


    

    return (
        <div className="HeaderContent">

        </div>
    )
})