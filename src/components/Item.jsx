import React from "react";
import { useEffect, useState } from "react";

export const Item = React.memo(({translateKey, image, sizes, price}) => {

    const [modernizerTitle, setModernizerTitle] = useState("");

    useEffect(() => {
        let newTitle = "";
        let arrayTitle = translateKey.split("");
        let newArrayTitle = [];
        for(let i = 0; i < arrayTitle.length; i++) {
            let elem = arrayTitle[i];
            if(elem === '-') {
                newArrayTitle.push(" ");
            }
            else {
                newArrayTitle.push(elem);
            }
        }
        newTitle = newArrayTitle.join("");
    }, [translateKey]);

    return (
        <div>
            {translateKey}
        </div>
    )
})