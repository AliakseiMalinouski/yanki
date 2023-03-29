import React, { useEffect, useState } from "react";
import { displayFlexAndJustifyContentIsSpaceEvenly } from "../helpers/objectsOfStyles";
import { checkedTypeOfContact } from "../helpers/checkedTypeOfContact";

export const Contact = React.memo(({title, contact, type, setLanguage}) => {

    const [newContact, setNewContact] = useState([] || "");


    useEffect(() => {
        setNewContact(checkedTypeOfContact(contact, []));
    }, [contact]);

    return (
        <div className="Contact">
            <h4>{setLanguage(`${title}`)}</h4>
            {
                typeof newContact === 'object'
                ?
                <ul className="ListOfContact" style={typeof newContact[0] === 'object' ? displayFlexAndJustifyContentIsSpaceEvenly : null}>
                    {
                        newContact.map(elem => elem)
                    }
                </ul>
                :
                <span>{setLanguage(`${newContact}`)}</span>
            }
        </div>
    )
})