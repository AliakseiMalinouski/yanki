import { setItemsCatalog } from "./catalogItemsSlice";

export const catalogItemsThunk = async (dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/61fb122e6889ccca3abc585957e9f274/raw/323b53cf7f7f7b4e2474d37495d5f14bbfdc6e73/CatalogItemsYanki");
        if(response.ok) {
            const data = await response.json();
            dispatch(setItemsCatalog(data));
        }
        else {
            alert("Error with download");
        }
    }
    catch {
        alert("Error with download");
    }
}