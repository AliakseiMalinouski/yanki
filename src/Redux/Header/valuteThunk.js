import { loadValute } from "./valuteSlice";

export const valuteThunk = (dispatch) => {
    fetch('https://gist.githubusercontent.com/AliakseiMalinouski/a403311526b216a9d19c12822d68c5dd/raw/7fd0583eb15dbe63c6e2a344e3fde2b4bd4b8aa3/ValuteListYanki', {method: 'get'})
    .then(r => r.ok ? r.json() : alert('Error with download'))
    .then(d => dispatch(loadValute(d)))
    .catch(e => alert(`Error with download. Type error is: ${e}`))
}