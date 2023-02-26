import { setIcons } from "./iconsSlice";

export const iconsThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/b78f50ff30411d809ec77ec2127eb9a0/raw/5d9ce0833c472df140763ea62dd4953c44fecea7/YankiHeaderIcons", {method: 'get'})
    .then(res => res.ok ? res.json() : alert("Error with download"))
    .then(data => dispatch(setIcons(data)))
    .catch(error => alert(`Error with download. Type error: ${error}`))
}