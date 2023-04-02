import { loadValute } from "./valueSlice";

export const valuteThunk = (dispatch) => {
    fetch('https://gist.githubusercontent.com/AliakseiMalinouski/a403311526b216a9d19c12822d68c5dd/raw/b81be0798840c87a38a25c5e4c6017d3423f00bd/ValuteListYanki', {method: 'get'})
    .then(r => r.ok ? r.json() : alert('Error with download'))
    .then(d => dispatch(loadValute(d)))
    .catch(e => alert(`Error with download. Type error is: ${e}`))
}