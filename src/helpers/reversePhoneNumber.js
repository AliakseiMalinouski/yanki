export const reversePhoneNumber = (phone) => {
    let symbolsOfPhone = phone.split("").reverse();
    let phoneNumberWithoutPlusOrMinus = symbolsOfPhone.filter(elem => {
      return elem !== '+' && elem !== '-';
    });
    let symbolsToNumbers = phoneNumberWithoutPlusOrMinus.map(elem => {
      return Number(elem);
    });
    let result = symbolsToNumbers.filter((elem, index) => {
      if(index < 4) {
        return elem;
      }
    })
    return Number(result.join(""));
}