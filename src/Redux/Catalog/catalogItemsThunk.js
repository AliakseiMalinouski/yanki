import { setItemsCatalog } from "./catalogItemsSlice";

export const catalogItemsThunk = async (dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/61fb122e6889ccca3abc585957e9f274/raw/0d5f6d9712f36b5bd9a8a9a332304434fc013540/CatalogItemsYanki");
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