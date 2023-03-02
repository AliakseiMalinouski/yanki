import React from "react";
import { useRef, useEffect } from "react";
import { scrollToElement } from "../helpers/scroll";

export const Catalog = () => {

    let parentNode = useRef();

    useEffect(() => {
        scrollToElement(parentNode.current);
    }, [parentNode]);

    return (
        <div className="Catalog" ref={parentNode}>
            Catalog
        </div>
    )
}