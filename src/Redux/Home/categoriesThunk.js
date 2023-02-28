import { setCategories } from "./categoriesSlice";

export const categoriesThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/6a44f68e4766978681131cbf6951ae7b/raw/2dd234ee39758cfa7bbc542ea22c77fe1af9b9f2/CategoriesYanki", {method: 'get'})
    .then(res => res.ok ? res.json() : alert("Error with download"))
    .then(data => dispatch(setCategories(data)))
    .catch(error => alert(`Error with download. Type Error: ${error}`))
}