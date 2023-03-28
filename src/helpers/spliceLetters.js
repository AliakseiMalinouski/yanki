export const spliceLetters = (result, startedArray, prop) => {
    for(let i = 0; i < startedArray.length; i++) {
        let elem = startedArray[i];
        let priceOfItem = elem.hasOwnProperty(`${prop}`) ? elem[`${prop}`] : {};
        let newString = priceOfItem && priceOfItem.replace(/[^\d-]/g, '');
        result.push(Number(newString));
    }
    return result;
}