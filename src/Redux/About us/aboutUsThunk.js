import { loadInfoAboutUs } from "./aboutUsSlice";

export const aboutUsThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/6068050eb8fa0b045c8895d8598a0aa0/raw/30e000c57682ede86ba817b9532a05ed1c6a29be/AboutUsYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert("Error with download"))
    .then(d => dispatch(loadInfoAboutUs(d)))
    .catch(e => alert(`Error with download and set data. Type error is: ${e}`))
}