import React, { useEffect, useState } from "react";

export const Contact = React.memo(({title, contact, type, setLanguage}) => {

    const [newContact, setNewContact] = useState([] || "");


    useEffect(() => {
        const checkedTypeOfContact = (arrayWithContacts, newArray) => {
            let stringType = '';
            if(typeof arrayWithContacts === 'object') {
                arrayWithContacts.forEach(elem => {
                    if(typeof elem === 'string') {
                        newArray.push(<li>{elem}</li>)
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
                <ul>
                    {
                        newContact.map(elem => elem)
                    }
                </ul>
                :
                <span>{newContact}</span>
            }
        </div>
    )
})