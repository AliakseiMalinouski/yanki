import { setNavLinks } from "./navLinkSlice";

export const ruNavLinkThunk = async(dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/8d46907812d1adf8d4db5d739e2609f8/raw/76946da0d17f7f30ae66a12896ec5795c234bcde/LinskRuYanki");
        if(response.ok) {
            const data = await response.json();
            dispatch(setNavLinks(data));
        }
        else {
            alert("Error with download");
        }
    }
    catch {
        alert("Error with download");
    }
}