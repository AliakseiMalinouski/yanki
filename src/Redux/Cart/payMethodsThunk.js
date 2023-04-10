import { setPayMethods } from "./payMethodsSlice";
export const payMethodsThunk = async (dispatch) => {
    try {
        const res = await fetch("https://gist.githubusercontent.com/AliakseiMalinouski/7d7fbe416e021722bf23d3edbf47d973/raw/b97d990c77b5b160ba3dfc026f94bee27c08f356/PayMethodsYanki");
        if(res.ok) {
            const data = await res.json();
            dispatch(setPayMethods(data));
        }
        else {
            alert('Error with download');
        }
    }
    catch {
        alert('Error with download')
    }
}