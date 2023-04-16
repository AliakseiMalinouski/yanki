export const validationForm = (objectsWithValues) => {
    let values = objectsWithValues;
    let arrayOfValues = [];
   
    for(let key in values) {
      arrayOfValues.push(values[key]);
      for(let i = 0; i < arrayOfValues.length; i++) {
      
      let element = typeof arrayOfValues[i] === 'string' ? arrayOfValues[i] : String(arrayOfValues[i]);
      
      if(!element.length) {
        return {
          type: "error-after-send",
          text: "pure-field-example",
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
          type: "error-after-send",
          text: "field-example",
          elementWithError: {
            content: element,
            indexOfElement: i,
            typeOfElement: key
          }
        }
      }
      
      else if(key === 'userEmail' && arrayOfValues[0].length < 11) {
        return {
          type: "error-after-send",
          text: "email-example",
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