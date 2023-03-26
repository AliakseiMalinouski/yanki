export const findKey = (object, name) => {
    for(let key in object) {
        if(key === name) {
            return object[name];
        }
    }
}