import { setNavLinks } from "./navLinkSlice";

export const navLinkThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/6710f36e8bcb40d5e817f30e834aa5db/raw/a0de8f88ac2b7c5824ce02446190bc136423744b/LinksYanki", {method: 'get'})
    .then(res => {
        if(!res.ok) alert("Error with download");
        else return res.json();
    })
    .then(data => dispatch(setNavLinks(data)))
    .catch(error => alert(`Error with download: type error ${error}`))
}