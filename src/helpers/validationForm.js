export const validationForm = (objectsWithValues) => {
    let values = objectsWithValues;
    let arrayOfValues = [];
   
    for(let key in values) {
      arrayOfValues.push(values[key]);
      for(let i = 0; i < arrayOfValues.length; i++) {
      
      let element = typeof arrayOfValues[i] === 'string' ? arrayOfValues[i] : String(arrayOfValues[i]);
      
      if(!element.length) {
        return {
          type: "Error",
          text: `Validation has failed, please, try again: field number ${i} is not correct`,
          elementWithError: {
            content: element, 
            indexOfElement: i,
            typeOfElement: key
          },
          status: 0
        }
      }
      
      else if(element.length && element.length < 4) {
        return {
          type: "Error",
          text: `Field must have most longer value, please, try again: value of field number ${i} is short`,
          elementWithError: {
            content: element,
            indexOfElement: i,
            typeOfElement: key
          }
        }
      }
      
      else if(key === 'userEmail' && arrayOfValues[0].length < 11) {
        return {
          type: "Error",
          text: "Email not be so short, please, enter other email",
          elementWithError: {
            content: element,
            indexOfElement: i,
            typeOfElement: key
          },
          status: 0
        }
      }
    }
    }
   
    
   return {
     type: "Success",
     text: "Validation completed",
     status: 1
   };
 }