import { loadColors } from "./gridItemSlice";

export const gridItemThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/a002d43738adee5a725e093dbcdd9b5b/raw/4c01e7dc2969a5fa7899216fd1124fb9e2c4c040/ColorsYanki", {method: 'get'})
    .then(r => r.ok ? r.json() : alert("Error with download"))
    .then(d => dispatch(loadColors(d)))
    .catch(e => alert(`Error with download and set data. Type error is: ${e}`))
}
