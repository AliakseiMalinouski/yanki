import { setItemsCatalog } from "./catalogItemsSlice";

export const catalogItemsThunk = async (dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/61fb122e6889ccca3abc585957e9f274/raw/7c1323230c256d33780a6a8eb9e6dba005a2a070/CatalogItemsYanki");
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