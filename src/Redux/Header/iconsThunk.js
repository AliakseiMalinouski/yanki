import { setIcons } from "./iconsSlice";

export const iconsThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/b78f50ff30411d809ec77ec2127eb9a0/raw/30db73a2dcae48849e3f14855733ac7076f84d08/YankiHeaderIcons", {method: 'get'})
    .then(res => res.ok ? res.json() : alert("Error with download"))
    .then(data => dispatch(setIcons(data)))
    .catch(error => alert(`Error with download. Type error: ${error}`))
}