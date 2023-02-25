import { setNavLinks } from "./navLinkSlice";

export const navLinkThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/6710f36e8bcb40d5e817f30e834aa5db/raw/ec53550c6dac0c0d65696f7e9be1f13c080d1bbe/LinksYanki", {method: 'get'})
    .then(res => {
        if(!res.ok) alert("Error with download");
        else return res.json();
    })
    .then(data => dispatch(setNavLinks(data)))
    .catch(error => alert(`Error with download: type error ${error}`))
}