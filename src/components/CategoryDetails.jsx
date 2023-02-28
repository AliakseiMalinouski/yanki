import React from "react";
import { useParams } from "react-router-dom";

export const CategoryDetails = React.memo(() => {

    let params = useParams();

    let categoryName = params.categoryname;

    return (
        <div> SOME INFO ABOUT {categoryName}</div>
    )
});