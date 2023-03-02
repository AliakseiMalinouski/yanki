import { setContentFooter } from "./footerContentSlice";

export const footerContentThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/cfcfef95fc759cc4aebc5dcdb646616b/raw/6f06015ac70a70071c350b1156ebbac22ed672d2/FooterContentYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert("Error with download"))
    .then(d => dispatch(setContentFooter(d)))
    .catch(e => alert(`Error with download. Type error is: ${e}`))
}