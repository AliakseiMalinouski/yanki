export const checkedTypeOfContact = (arrayWithContacts, newArray) => {
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