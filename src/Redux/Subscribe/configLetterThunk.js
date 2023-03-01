import { saveDataLetter } from "./configLetterSlice";

export const configLetterThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/7a8e562a8744880f8acfeb2c04bf113f/raw/5e4752f33df0845a499917c96191f9b5fa20f431/KeysEmailYanki", {method: 'get'})
    .then(res => res.ok ? res.json() : alert("Error with download"))
    .then(data => dispatch(saveDataLetter(data)))
    .catch(error => alert(`Error with download. Type Error is: ${error}`))
}