import React from "react";

export const EmptyCatalog = React.memo(() => {
    return (
        <div className="EmptyCatalog">
            item with this filter is not in the catalog
        </div>
    )
})