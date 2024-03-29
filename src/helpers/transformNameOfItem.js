export const transformItemName = (name) => {
    let result = [];
    let nameCharArray = name.split("");
    for(let i = 0; i < nameCharArray.length; i++) {
        let elem = nameCharArray[i];
        if(elem === "-") {
            result.push(" ");
        }
        else {
            result.push(elem);
        }
        for(let j = 0; j < result.length; j++) {
            result[0] = result[0].toUpperCase();
            if(result[j - 1] === " ") {
                result[j] = result[j].toUpperCase();
            }
        }
    }
    return result.join("");
}