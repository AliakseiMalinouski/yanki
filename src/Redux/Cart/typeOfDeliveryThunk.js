import { setTypes } from "./typeOfDeliverySlice"
export const typeOfDeliveryThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/237eb4681c41553a56b1394610e717d5/raw/6a7e560bdc639d10c8083f4cb84bb8b0cbeab8bd/TypesOfDYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert(`Error witn download`))
    .then(d => dispatch(setTypes(d)))
    .catch(e => alert(`Error witn download. Type error is ${e}`))
}