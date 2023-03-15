import { setTopTitles } from "./topFilterSlice";

export const topFilterThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/b8b0376e4382e04ae67c3ce4d5556c49/raw/032f7af3b7db6550ee747bab5b74e27062a7fc5a/TopFilterYanki")
    .then(res => !res.ok ? alert("Error with download") : res.json())
    .then(data => dispatch(setTopTitles(data)))
    .catch(error => alert(`Error with set data. Type error is: ${error}`))
}