import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderIcon = ({link, image, alt, favouriteLength}) => {
    if(link === '/favourite') {
        return (
            <NavLink to={link}><img src={image} alt={alt}/>{favouriteLength}</NavLink>
        )
    }
    else {
        return (
            <NavLink to={link}><img src={image} alt={alt}/></NavLink>
        )
    }
}