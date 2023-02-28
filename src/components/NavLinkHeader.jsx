import React from "react";
import {NavLink} from 'react-router-dom';

export const NavLinkHeader = React.memo(({title, link, currentPage}) => {
    if(link === currentPage) {
        return (
            <li className="NavLink"><NavLink className="ActivePage" to={link}>{title}</NavLink></li>
        )
    }
    else {
        return (
            <li className="NavLink"><NavLink to={link}>{title}</NavLink></li>
        )
    }
})