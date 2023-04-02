export const convertToNewValute = (state, price) => {
    let priceWithoutLetters = price.replace(/[^\d-]/g, '');
    let result = null;
    if(state === 'usd') {
        result = (priceWithoutLetters / 37).toFixed(0) + ' usd';
    }
    else if(state === 'eu') {
        result = (priceWithoutLetters / 40).toFixed(0) + ' eur';
    }
    return result;
}

