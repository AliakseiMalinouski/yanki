import React, { useEffect, useState } from "react";
import { displayFlexAndJustifyContentIsSpaceEvenly } from "../helpers/objectsOfStyles";

export const Contact = React.memo(({title, contact, type, setLanguage}) => {

    const [newContact, setNewContact] = useState([] || "");


    useEffect(() => {
        const checkedTypeOfContact = (arrayWithContacts, newArray) => {
            let stringType = '';
            if(typeof arrayWithContacts === 'object') {
                arrayWithContacts.forEach(elem => {
                    if(typeof elem === 'string') {
                        newArray.push(<li key={elem}>{elem}</li>)
                    }
                    else {
                        newArray.push(<li key={elem.id}>
                            <img src={elem.src} alt={elem.alt}/>
                        </li>)
                    }
                })
                return newArray;
            }
            else {
                stringType = arrayWithContacts;
                return stringType;
            }
        }
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