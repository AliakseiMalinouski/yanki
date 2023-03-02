import { setContentFooter } from "./footerContentSlice";

export const footerContentThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/cfcfef95fc759cc4aebc5dcdb646616b/raw/bf374b4efbaf267c58f3c0b9dc5b8cc10d67e5eb/FooterContentYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert("Error with download"))
    .then(d => dispatch(setContentFooter(d)))
    .catch(e => alert(`Error with download. Type error is: ${e}`))
}