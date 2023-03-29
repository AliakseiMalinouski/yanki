export const getNeededValue = (value, varWhereWeAreSearching, key) => {
    if(Array.isArray(varWhereWeAreSearching)) {
        let objectFromArray = varWhereWeAreSearching.find(element => {
            return element[key] === value;
        });
        return objectFromArray;
    }
}