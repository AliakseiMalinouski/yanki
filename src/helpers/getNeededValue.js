export const getNeededValue = (value, varWhereWeAreSearching, key) => {
    // this search request all arguments of function
      if(Array.isArray(varWhereWeAreSearching)) {
          let objectFromArray = varWhereWeAreSearching.find(element => {
              return element[key] === value;
          });
          return objectFromArray;
      }
      else if(typeof varWhereWeAreSearching === 'object' && !Array.isArray(varWhereWeAreSearching)) { 
        // this search does not request "value argument"
          for(let keyOfObject in varWhereWeAreSearching) {
              if(key === keyOfObject) {
                  return varWhereWeAreSearching[keyOfObject];
              }
          }
      }
      else if(typeof varWhereWeAreSearching === 'string') { 
        // this search does not request "value argument"
          let neededChar = varWhereWeAreSearching.split(" ").filter(element => element === key).join("");
          return neededChar;
      }
  }