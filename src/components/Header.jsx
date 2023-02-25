import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navLinkThunk } from "../Redux/Header/navLinkThunk";

export const Header = () => {

    let dispatch = useDispatch();

    const navLinks = useSelector(state => state.navLinks.navLinks);

    useEffect(() => {
        dispatch(navLinkThunk);
    }, [dispatch]);

    console.log(navLinks)

    return (
        <></>
    )
}