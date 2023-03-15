export const concatArray = (emptyArray, object) => {
    for(let key in object) {
        if(typeof object === 'object') {
            emptyArray = [...emptyArray, ...object[key]];
        }
    }
    return emptyArray;
}