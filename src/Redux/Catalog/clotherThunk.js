import { setTitlesClothes } from "./clothesSlice";

export const clotherThunk = async(dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/202820f173ffaccb55b9af8e0a04c9db/raw/f1856b027dd9d0ddd8bb20382b82209806dad27e/ClothesFilterYanki");
        if(response.ok) {
            const data = await response.json();
            dispatch(setTitlesClothes(data));
        }
    }
    catch {
        alert("Error with download data");
    }
}