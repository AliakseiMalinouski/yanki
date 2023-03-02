import { setContentFooter } from "./footerContentSlice";

export const footerContentThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/cfcfef95fc759cc4aebc5dcdb646616b/raw/e6d904a2adf606848b8bca6792bdab7d912598d8/FooterContentYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert("Error with download"))
    .then(d => dispatch(setContentFooter(d)))
    .catch(e => alert(`Error with download. Type error is: ${e}`))
}