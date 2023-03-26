export const createImageElement = (flag, array) => {
    let objectWithParams = array && array.find(elem => elem.alt === flag);
    let alt = '';
    let src = '';
    for(let key in objectWithParams) {
        if(key === 'id') {
            continue;
        } 
        else if(key === 'image') src = objectWithParams[key];
        else if (key === 'alt') alt = objectWithParams[key];
    }
    return <img src={src} alt={alt}/>
}