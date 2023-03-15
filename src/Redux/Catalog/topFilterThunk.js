import { setTopTitles } from "./topFilterSlice";

export const topFilterThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/b8b0376e4382e04ae67c3ce4d5556c49/raw/291d6a89f319c959d81c19c83a9e12065505b7a6/TopFilterYanki")
    .then(res => !res.ok ? alert("Error with download") : res.json())
    .then(data => dispatch(setTopTitles(data)))
    .catch(error => alert(`Error with set data. Type error is: ${error}`))
}