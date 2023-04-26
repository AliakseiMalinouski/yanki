import React from "react";
import { NavLink } from "react-router-dom";
import { yankiEvents } from "../events";

export const HeaderIcon = ({link, image, alt, favouriteLength, cartLength}) => {
    const closeModal = () => {
        yankiEvents.emit("closeModal", true);
    }
    if(link === '/favourite') {
        return (
            <NavLink onClick={closeModal} to={link}><img src={image} alt={alt}/><span>{favouriteLength}</span></NavLink>
        )
    }
    else if(link === '/cart') {
        return (
            <NavLink onClick={closeModal} to={link}><img src={image} alt={alt}/><span>{cartLength}</span></NavLink>
        )
    }
    else {
        return (
            <NavLink onClick={closeModal} to={link}><img src={image} alt={alt}/></NavLink>
        )
    }
}