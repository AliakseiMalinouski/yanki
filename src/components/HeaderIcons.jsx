import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderIcon = ({link, image, alt}) => {
    return (
        <NavLink to={link}><img src={image} alt={alt}/></NavLink>
    )
}