export const sortByPriceOfItem = (oldArray, operation, key) => {
    let newArray = [];
    for(let elem of oldArray) {
        newArray.push({...elem, price: Number(elem.price.replace(/[^\d-]/g, ''))})
    }
    let cloneOfNewArray = [...newArray];
    if(operation === 'decreasing') {
        cloneOfNewArray.sort((a, b) => b[key] - a[key]);
    }
    else {
        cloneOfNewArray.sort((a, b) => a[key] - b[key]);
    }
    return cloneOfNewArray;
}