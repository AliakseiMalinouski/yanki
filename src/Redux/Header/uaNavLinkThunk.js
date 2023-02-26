import { setNavLinks } from "./navLinkSlice";

export const uaNavLinkThunk = async(dispatch) => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/6ec1d593dd2bd2f6cb9e0f9392b8fbdb/raw/d4a898cc28c998ab3919392de68372cab969c0d2/UaLinkYanki");
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