import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderIcon = ({link, image, alt, favouriteLength, cartLength}) => {
    if(link === '/favourite') {
        return (
            <NavLink to={link}><img src={image} alt={alt}/><span>{favouriteLength}</span></NavLink>
        )
    }
    else if(link === '/cart') {
        return (
            <NavLink to={link}><img src={image} alt={alt}/><span>{cartLength}</span></NavLink>
        )
    }
    else {
        return (
            <NavLink to={link}><img src={image} alt={alt}/></NavLink>
        )
    }
}