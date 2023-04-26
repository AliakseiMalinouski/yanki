import React from "react";
import {NavLink} from 'react-router-dom';
import { yankiEvents } from "../events";

export const NavLinkHeader = React.memo(({title, link, currentPage}) => {
    const closeModal = () => {
        yankiEvents.emit("closeModal", true);
    }
    if(link === currentPage) {
        return (
            <li className="NavLink"><NavLink onClick={closeModal} className="ActivePage" to={link}>{title}</NavLink></li>
        )
    }
    else {
        return (
            <li className="NavLink"><NavLink onClick={closeModal} to={link}>{title}</NavLink></li>
        )
    }
})