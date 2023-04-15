export const transformNameToUpCase = (name) => {
    let nameLikeArray = name.split("");
  
    if(name[0].toUpperCase() === name[0]) return name;
  
    let tranformated = nameLikeArray.map((elem, index) => {
        if(index === 0) {
            return elem.toUpperCase();
        }
        else {
            return elem;
        }
    });
    let nameLikeString = tranformated.join("");
    return nameLikeString;
}